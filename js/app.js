/* ============================================================
   NAJAH — Unified app.js
   Merged from the original app.js + app(1).js
   Frontend only: HTML + CSS + JavaScript + Bootstrap
   ============================================================ */

const SITE_URL = 'https://abdokhaledshaaban.github.io/najah/';
const EMERGENCY_NUMBER = '123';

/* ============================================================
   HELPERS
   ============================================================ */

const escapeHTML = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const linesToHTML = (value = '') =>
  escapeHTML(value).replace(/\n/g, '<br>');

const callEmergencyHTML = `
  <a href="tel:${EMERGENCY_NUMBER}"
     class="btn btn-danger rounded-pill">
    <i class="bi bi-telephone-fill ms-1"></i>
    الإسعاف ${EMERGENCY_NUMBER}
  </a>
`;

/* ============================================================
   INITIAL UI / EXISTING ANIMATIONS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');

  setTimeout(() => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 650);
    }
  }, 450);

  /* Keep the original reveal animation */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((element) => {
    io.observe(element);
  });

  /* Keep the original counters */
  document.querySelectorAll('[data-count]').forEach((element) => {
    const target = Number(element.dataset.count);
    let number = 0;
    const step = Math.max(1, Math.ceil(target / 40));

    const timer = setInterval(() => {
      number = Math.min(target, number + step);
      element.textContent = number + (target === 100 ? '%' : '');

      if (number >= target) {
        clearInterval(timer);
      }
    }, 30);
  });

  /* Existing QR */
  const qr = document.getElementById('qrcode');

  if (qr && typeof QRCode !== 'undefined') {
    new QRCode(qr, {
      text: SITE_URL,
      width: 220,
      height: 220,
      colorDark: '#0A192F',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    });

    const preview = document.getElementById('siteUrlPreview');

    if (preview) {
      preview.textContent = SITE_URL;
    }
  }

  /* Existing checklist */
  const checklist = document.getElementById('checklist');

  if (checklist) {
    const boxes = [...checklist.querySelectorAll('input')];
    const score = document.getElementById('score');

    boxes.forEach((box) => {
      box.addEventListener('change', () => {
        if (!boxes.length || !score) return;

        const percentage = Math.round(
          (boxes.filter((item) => item.checked).length / boxes.length) * 100
        );

        score.textContent = percentage + '%';
      });
    });
  }
});

/* ============================================================
   EMERGENCY DATA
   NOTE:
   This is educational content. In a real emergency, contact
   local emergency services and follow dispatcher instructions.
   Practical CPR/choking skills should be learned hands-on.
   ============================================================ */

const CASES = [
  {
    id: 'stroke',
    icon: 'bi-brain',
    title: 'السكتة الدماغية',
    tag: 'TIME SENSITIVE',
    short:
      'أعراض عصبية مفاجئة تحتاج إلى التعرف عليها وطلب المساعدة الطبية بسرعة.',

    signs: [
      'ضعف أو تنميل مفاجئ، خصوصًا في جانب واحد من الجسم.',
      'صعوبة مفاجئة في الكلام أو فهم الكلام.',
      'اضطراب مفاجئ في الرؤية أو المشي أو التوازن.',
      'صداع شديد مفاجئ قد يحدث في بعض أنواع السكتة.',
    ],

    action:
      'تعرف على العلامات واطلب المساعدة الطبية العاجلة. سجّل وقت بداية الأعراض أو آخر وقت كان فيه الشخص طبيعيًا إن أمكن، وأخبر خدمات الطوارئ به.',

    detailedAction: [
      'اطلب الإسعاف فورًا عند الاشتباه في السكتة الدماغية.',
      'لا تنتظر اختفاء الأعراض ولا تحاول تشخيص النوع بنفسك.',
      'سجّل وقت بداية الأعراض أو آخر وقت كان فيه الشخص طبيعيًا إن أمكن.',
      'راقب الاستجابة والتنفس وابقَ مع الشخص حتى وصول المساعدة.',
    ],

    avoid: [
      'لا تعطِ أدوية من عندك، بما فيها الأسبرين، لأن نوع السكتة لا يمكن تحديده بأمان في المنزل.',
      'لا تعطِ طعامًا أو شرابًا إذا كان البلع غير آمن أو الشخص غير يقظ تمامًا.',
      'لا تؤخر طلب الإسعاف من أجل البحث عن علاج منزلي.',
    ],

    source:
      'محتوى توعوي مستند إلى إرشادات الإسعافات الأولية والإنعاش الحديثة من American Red Cross وAHA/ASA.',

    tree: {
      question:
        'هل توجد علامات مفاجئة مثل ضعف في جانب واحد، اضطراب الكلام، أو اضطراب الرؤية/التوازن؟',

      yes: {
        action:
          'اشتبِه في السكتة الدماغية: اطلب الإسعاف فورًا، وسجّل وقت بداية الأعراض أو آخر وقت كان فيه الشخص طبيعيًا، وراقب حالته حتى وصول المساعدة.',

        avoid:
          'لا تنتظر تحسن الأعراض، ولا تعطِ أدوية أو طعامًا أو شرابًا من تلقاء نفسك.',
      },

      no: {
        action:
          'إذا لم توجد هذه العلامات، لا تحاول تشخيص الحالة من خلال الموقع. إذا كانت الأعراض شديدة أو مفاجئة أو تتدهور، اطلب تقييمًا طبيًا عاجلًا.',

        avoid:
          'لا تعتمد على الاختبار وحده لاستبعاد السكتة الدماغية.',
      },
    },
  },

  {
    id: 'choking',
    icon: 'bi-lungs',
    title: 'الاختناق',
    tag: 'AIRWAY',
    short:
      'انسداد مجرى الهواء قد يصبح خطيرًا بسرعة، والاستجابة تختلف حسب العمر وشدة الانسداد.',

    signs: [
      'عدم القدرة على الكلام أو السعال بشكل فعال.',
      'صعوبة شديدة في التنفس.',
      'إشارات واضحة للاختناق مثل الإمساك بالرقبة.',
      'تدهور الوعي أو فقدان الاستجابة.',
    ],

    action:
      'حدّد أولًا هل الشخص يستطيع السعال أو الكلام والتنفس. إذا كان الانسداد شديدًا، اطلب المساعدة واتبع تعليمات خدمات الطوارئ والتدريب المعتمد.',

    detailedAction: [
      'إذا كان الشخص يستطيع السعال أو الكلام والتنفس، شجعه على الاستمرار في السعال وراقبه.',
      'إذا أصبح غير قادر على الكلام أو السعال أو التنفس بشكل فعال، فعّل الاستجابة الطارئة واطلب المساعدة فورًا.',
      'إجراءات الاختناق تختلف للرضيع والطفل والبالغ وللحامل أو الشخص ذي البنية الكبيرة؛ لا تستخدم تقنية واحدة للجميع.',
      'إذا أصبح الشخص غير مستجيب، اتبع تعليمات خدمات الطوارئ وابدأ الإنعاش وفق تدريبك وتعليمات عامل الطوارئ.',
    ],

    avoid: [
      'لا تستخدم مناورة واحدة لكل الأعمار والحالات.',
      'لا تدخل أصابعك عشوائيًا داخل فم شخص فاقد للوعي؛ أزل جسمًا غريبًا فقط إذا كان ظاهرًا ويمكن إزالته بأمان.',
      'لا تجعل تصفح الموقع يؤخر الاتصال بالطوارئ.',
    ],

    source:
      'محتوى توعوي مستند إلى إرشادات AHA وAmerican Red Cross الخاصة بانسداد مجرى الهواء.',

    tree: {
      question:
        'هل يستطيع المصاب السعال أو الكلام أو إصدار صوت بشكل فعال؟',

      yes: {
        action:
          'شجعه على السعال وراقبه عن قرب. إذا تدهورت قدرته على التنفس أو الكلام أو أصبح غير مستجيب، اطلب المساعدة الطارئة فورًا.',

        avoid:
          'لا تعطه طعامًا أو شرابًا بهدف دفع الجسم الغريب إلى الأسفل، ولا تستخدم إجراءات قوية بلا تدريب.',
      },

      no: {
        action:
          'اعتبر الانسداد شديدًا. اطلب الإسعاف فورًا واتبع تعليمات عامل الطوارئ. بالنسبة للبالغين والأطفال والرضع توجد تقنيات مختلفة، ويجب تطبيقها وفق التدريب المناسب.',

        avoid:
          'لا تستخدم نفس طريقة الاختناق للبالغ مع الرضيع أو الطفل، ولا تحاول استخراج جسم غير ظاهر بإصبعك.',
      },
    },
  },

  {
    id: 'cardiac',
    icon: 'bi-heart-pulse',
    title: 'توقف القلب / فقدان الاستجابة',
    tag: 'CPR & AED',
    short:
      'فقدان الاستجابة مع غياب التنفس الطبيعي أو وجود شهقات غير طبيعية علامة طارئة.',

    signs: [
      'الشخص لا يستجيب عند مناداته أو محاولة إيقاظه.',
      'لا يتنفس طبيعيًا أو توجد شهقات غير طبيعية.',
      'الحالة تتطلب تفعيل الاستجابة الطارئة فورًا.',
    ],

    action:
      'اطلب الإسعاف فورًا. إذا كان الشخص غير مستجيب ولا يتنفس طبيعيًا، ابدأ CPR وفق تدريبك أو اتبع تعليمات عامل الطوارئ، واستخدم AED عندما يتوفر ويكون آمنًا.',

    detailedAction: [
      'تأكد من أن المكان آمن لك وللمصاب.',
      'تحقق من الاستجابة والتنفس الطبيعي بسرعة.',
      'اطلب من شخص محدد الاتصال بالطوارئ وإحضار AED إن توفر.',
      'إذا كان الشخص غير مستجيب ولا يتنفس طبيعيًا، ابدأ CPR وفق تدريبك أو تعليمات عامل الطوارئ.',
      'استخدم AED عندما يتوفر واتبع تعليماته الصوتية والمرئية.',
      'استمر في المساعدة حتى وصول فرق الطوارئ أو عودة علامات الحياة أو عدم قدرتك على الاستمرار.',
    ],

    avoid: [
      'لا تنتظر طويلًا قبل تفعيل الاستجابة الطارئة.',
      'لا تستخدم AED في بيئة غير آمنة أو بطريقة تخالف تعليماته.',
      'لا توقف الإنعاش لمجرد أن الشخص لم يستجب فورًا.',
    ],

    source:
      'محتوى توعوي مستند إلى إرشادات AHA وAmerican Red Cross للـBLS/CPR/AED.',

    tree: {
      question:
        'هل الشخص غير مستجيب ولا يتنفس طبيعيًا أو لديه شهقات غير طبيعية؟',

      yes: {
        action:
          'فعّل الاستجابة الطارئة فورًا. ابدأ CPR وفق تدريبك أو تعليمات عامل الطوارئ، واستخدم AED عند توفره وبشكل آمن.',

        avoid:
          'لا تؤخر طلب المساعدة ولا تنتظر التأكد لفترة طويلة.',
      },

      no: {
        action:
          'إذا كان الشخص يستجيب أو يتنفس طبيعيًا، راقبه واطلب التقييم المناسب إذا كانت هناك مشكلة صحية مستمرة أو خطيرة.',

        avoid:
          'لا تبدأ CPR على شخص يتنفس طبيعيًا ويستجيب بشكل طبيعي.',
      },
    },
  },

  {
    id: 'bleeding',
    icon: 'bi-droplet-half',
    title: 'النزيف الشديد',
    tag: 'BLEEDING',
    short:
      'النزيف الخارجي المهدد للحياة يحتاج إلى استجابة سريعة وتفعيل المساعدة الطبية.',

    signs: [
      'نزيف غزير أو مستمر.',
      'الدم يتجمع أو يتشبع به القماش بسرعة.',
      'علامات ضعف أو تدهور عام مع النزيف.',
    ],

    action:
      'احمِ نفسك، اطلب المساعدة عند النزيف الخطير، واستخدم وسائل السيطرة على النزيف التي تعلمتها في تدريب معتمد.',

    detailedAction: [
      'تأكد من سلامة المكان واستخدم وسائل حماية مناسبة إن توفرت.',
      'اطلب خدمات الطوارئ عند وجود نزيف مهدد للحياة.',
      'استخدم ضغطًا مباشرًا ومستمرًا على النزيف باستخدام شاش أو قطعة قماش مناسبة.',
      'إذا كنت مدربًا على وسائل إضافية للسيطرة على النزيف، اتبع التدريب المعتمد وتعليمات الطوارئ.',
      'راقب الشخص حتى وصول المساعدة.',
    ],

    avoid: [
      'لا تعرض نفسك للدم دون احتياطات مناسبة.',
      'لا ترفع الضمادة مرارًا لفحص الجرح؛ اتبع تدريب السيطرة على النزيف.',
      'لا تضع القهوة أو معجون الأسنان أو مواد منزلية داخل الجرح.',
    ],

    source:
      'محتوى توعوي مستند إلى إرشادات American Red Cross للإسعافات الأولية والسيطرة على النزيف.',

    tree: {
      question:
        'هل النزيف غزير أو مستمر أو يبدو مهددًا للحياة؟',

      yes: {
        action:
          'اطلب الإسعاف فورًا، واستخدم ضغطًا مباشرًا ومستمرًا على مكان النزيف بوسيلة مناسبة، مع حماية نفسك من الدم.',

        avoid:
          'لا تؤخر طلب المساعدة ولا تضع مواد منزلية داخل الجرح.',
      },

      no: {
        action:
          'استمر في مراقبة النزيف واطلب تقييمًا طبيًا إذا لم يتوقف أو ظهرت علامات تدهور.',

        avoid:
          'لا تهمل جرحًا عميقًا أو نزيفًا مستمرًا لمجرد أنه يبدو صغيرًا في البداية.',
      },
    },
  },

  {
    id: 'burns',
    icon: 'bi-fire',
    title: 'الحروق',
    tag: 'THERMAL INJURY',
    short:
      'تختلف الحروق في شدتها، وبعضها يحتاج إلى تقييم طبي عاجل.',

    signs: [
      'حرق واسع أو عميق.',
      'حرق في الوجه أو الفم أو اليدين أو المفاصل أو مناطق حساسة.',
      'حرق كهربائي أو كيميائي أو مرتبط بانفجار.',
      'جلد أبيض أو أسود أو متفحم أو ألم غير معتاد.',
    ],

    action:
      'أبعد الشخص عن مصدر الخطر إذا كان ذلك آمنًا، وبرّد الحرق بماء جارٍ نظيف وبارد باعتدال للحروق البسيطة، واطلب تقييمًا طبيًا للحروق الكبيرة أو العميقة أو الخاصة.',

    detailedAction: [
      'أوقف مصدر الحرارة أو أبعد الشخص عنه فقط إذا كان ذلك آمنًا.',
      'أزل الملابس أو الإكسسوارات غير الملتصقة بمنطقة الحرق.',
      'للحرق البسيط، برّد المنطقة بماء جارٍ نظيف وبارد باعتدال لمدة مناسبة وفق إرشادات الإسعافات الأولية.',
      'لا تنزع أي شيء ملتصق بالجلد المحروق.',
      'غطِّ الحرق بشكل فضفاض بضمادة نظيفة مناسبة إذا كانت هناك حاجة لذلك.',
      'اطلب رعاية طبية عاجلة للحروق الكبيرة أو العميقة، أو حروق الوجه/الفم/اليدين/المفاصل، أو الحروق الكهربائية والكيميائية، أو عند وجود صعوبة في التنفس.',
    ],

    avoid: [
      'لا تضع الثلج مباشرة على الحرق.',
      'لا تضع الزبدة أو معجون الأسنان أو وصفات منزلية غير موثوقة.',
      'لا تفقع الفقاعات.',
      'لا تنزع الملابس الملتصقة بالجلد.',
    ],

    source:
      'محتوى توعوي مستند إلى إرشادات American Red Cross للحروق؛ الإرشادات المنشورة توصي بالماء الجاري النظيف البارد باعتدال وتجنب الثلج والوصفات المنزلية.',

    tree: {
      question:
        'هل الحرق كبير أو عميق أو كهربائي/كيميائي أو في منطقة حساسة أو توجد صعوبة في التنفس؟',

      yes: {
        action:
          'اطلب تقييمًا طبيًا عاجلًا. أبعد الشخص عن مصدر الخطر إن كان ذلك آمنًا، ولا تضع مواد منزلية على الحرق.',

        avoid:
          'لا تستخدم الثلج مباشرة ولا تنزع الملابس الملتصقة بالجلد.',
      },

      no: {
        action:
          'للحرق البسيط، برّد المنطقة بماء جارٍ نظيف وبارد باعتدال، ثم غطها بشكل مناسب إذا لزم الأمر وراقبها.',

        avoid:
          'لا تستخدم الزبدة أو معجون الأسنان أو أي وصفة منزلية غير موثوقة.',
      },
    },
  },

  {
    id: 'drowning',
    icon: 'bi-water',
    title: 'الغرق',
    tag: 'WATER SAFETY',
    short:
      'الغرق حالة مرتبطة بنقص الأكسجين وتحتاج إلى استجابة عاجلة مع الحفاظ على سلامة المنقذ.',

    signs: [
      'عدم الاستجابة بعد إخراج الشخص من الماء.',
      'غياب التنفس الطبيعي أو وجود صعوبة واضحة في التنفس.',
      'تدهور الحالة بعد حادث غرق.',
    ],

    action:
      'لا تعرض نفسك للخطر أثناء الإنقاذ. اطلب خدمات الطوارئ. إذا كان هناك توقف قلب بعد الغرق، توصي الإرشادات ببدء الإنعاش مع التهوية عندما يكون المنقذ مدربًا وقادرًا، مع اتباع تعليمات الطوارئ.',

    detailedAction: [
      'لا تدخل الماء لإنقاذ شخص إذا كان ذلك سيعرضك للخطر؛ استخدم وسيلة آمنة للمساعدة واطلب المختصين.',
      'بعد إخراج الشخص من الماء، قيّم الاستجابة والتنفس بسرعة.',
      'إذا كان فاقدًا للوعي ولا يتنفس طبيعيًا، فعّل الاستجابة الطارئة وابدأ CPR وفق تدريبك وتعليمات عامل الطوارئ.',
      'في حالات توقف القلب بسبب الغرق، تركز إرشادات Red Cross على التهوية مع الضغطات للمنقذين القادرين والمدربين، بينما يظل الضغط الصدري خيارًا إذا تعذر إعطاء الأنفاس.',
      'استخدم AED عندما يتوفر ويكون ذلك آمنًا، بعد إخراج الشخص من الماء وتجفيف الصدر وفق تعليماته.',
    ],

    avoid: [
      'لا تدخل الماء إذا كان ذلك سيعرضك للخطر.',
      'لا تضيع الوقت في محاولة إخراج الماء من المعدة بالضغط على البطن.',
      'لا تؤخر الاتصال بالطوارئ.',
    ],

    source:
      'محتوى توعوي مستند إلى إرشادات American Red Cross وILCOR حول الإنعاش بعد الغرق.',

    tree: {
      question:
        'بعد إخراج المصاب من الماء، هل هو واعٍ ويتنفس طبيعيًا؟',

      yes: {
        action:
          'راقب حالته واطلب التقييم الطبي عند وجود أعراض تنفسية أو تدهور بعد الغرق، مع إبقاء الشخص دافئًا وآمنًا.',

        avoid:
          'لا تترك الشخص وحده إذا كانت حالته تتدهور أو تظهر أعراض تنفسية.',
      },

      no: {
        action:
          'فعّل الاستجابة الطارئة فورًا. إذا كان لا يتنفس طبيعيًا، ابدأ CPR وفق تدريبك وتعليمات الطوارئ؛ وفي الغرق، تكون التهوية مهمة للمنقذ المدرب والقادر.',

        avoid:
          'لا تدخل الماء لإنقاذه إذا كان ذلك سيعرضك للخطر، ولا تحاول عصر الماء من البطن.',
      },
    },
  },
];

/* ============================================================
   EMERGENCY LIBRARY
   ============================================================ */

const grid = document.getElementById('caseGrid');

function renderCaseCards() {
  if (!grid) return;

  grid.innerHTML = CASES.map(
    (c, index) => `
      <div class="col-md-6 col-lg-4">
        <article
          class="condition-card reveal"
          style="--case-index:${index};"
        >
          <div class="condition-icon">
            <i class="bi ${escapeHTML(c.icon)}"></i>
          </div>

          <span class="mini-label d-block mt-3">
            ${escapeHTML(c.tag)}
          </span>

          <h3>${escapeHTML(c.title)}</h3>

          <p class="short">
            ${escapeHTML(c.short)}
          </p>

          <h6>علامات مهمة</h6>

          <ul>
            ${c.signs
              .slice(0, 3)
              .map((sign) => `<li>${escapeHTML(sign)}</li>`)
              .join('')}
          </ul>

          <button
            type="button"
            class="btn btn-outline-light rounded-pill mt-2"
            onclick="openCase('${escapeHTML(c.id)}')"
          >
            عرض التفاصيل
            <i class="bi bi-arrow-left"></i>
          </button>
        </article>
      </div>
    `
  ).join('');

  /* Activate the same reveal system for newly generated cards */
  requestAnimationFrame(() => {
    grid.querySelectorAll('.reveal').forEach((element) => {
      element.classList.add('show');
    });
  });
}

renderCaseCards();

/* ============================================================
   CASE MODAL
   ============================================================ */

function openCase(id) {
  const currentCaseData = CASES.find((item) => item.id === id);

  if (!currentCaseData || typeof bootstrap === 'undefined') return;

  const oldModal = document.getElementById('caseModal');

  if (oldModal) {
    oldModal.remove();
  }

  const detailedSteps = currentCaseData.detailedAction
    .map(
      (step, index) => `
        <div class="step d-flex gap-3 mb-3">
          <span class="step-num">${index + 1}</span>
          <span>${escapeHTML(step)}</span>
        </div>
      `
    )
    .join('');

  const avoid = currentCaseData.avoid
    .map(
      (item) =>
        `<li class="mb-2">${escapeHTML(item)}</li>`
    )
    .join('');

  document.body.insertAdjacentHTML(
    'beforeend',
    `
      <div
        class="modal fade"
        id="caseModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content modal-dark">

            <div class="modal-header border-secondary">
              <div>
                <span class="mini-label">
                  ${escapeHTML(currentCaseData.tag)}
                </span>

                <h3>${escapeHTML(currentCaseData.title)}</h3>
              </div>

              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="إغلاق"
              ></button>
            </div>

            <div class="modal-body">

              <p class="result-note">
                ${escapeHTML(currentCaseData.short)}
              </p>

              <h5>علامات مهمة</h5>

              <ul>
                ${currentCaseData.signs
                  .map(
                    (sign) =>
                      `<li class="mb-2">${escapeHTML(sign)}</li>`
                  )
                  .join('')}
              </ul>

              <h5 class="mt-4">
                ما الذي يركز عليه الحل؟
              </h5>

              <div class="guide-result">
                ${escapeHTML(currentCaseData.action)}
              </div>

              <h5 class="mt-4">
                شرح أكثر تفصيلًا
              </h5>

              <div class="guide-result">
                ${detailedSteps}
              </div>

              <h5 class="mt-4 text-danger">
                تجنب تمامًا
              </h5>

              <ul class="text-warning">
                ${avoid}
              </ul>

              <div class="mt-4 text-center">
                ${callEmergencyHTML}
              </div>

              <div class="safety-note mt-4">
                <i class="bi bi-shield-check"></i>
                ${escapeHTML(currentCaseData.source)}
                <br>
                هذا الموقع تعليمي ولا يَستبدل خدمات الطوارئ أو التدريب
                العملي المعتمد.
              </div>

            </div>

            <div class="modal-footer border-secondary">
              <button
                type="button"
                class="btn btn-outline-light rounded-pill"
                data-bs-dismiss="modal"
              >
                إغلاق
              </button>

              <a
                href="guide.html?case=${encodeURIComponent(currentCaseData.id)}"
                class="btn btn-danger rounded-pill"
              >
                الدليل التفاعلي
              </a>
            </div>

          </div>
        </div>
      </div>
    `
  );

  const modalElement = document.getElementById('caseModal');
  const modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener(
    'shown.bs.modal',
    () => {
      modalElement
        .querySelectorAll('.step')
        .forEach((step, index) => {
          step.style.animationDelay = `${index * 80}ms`;
          step.classList.add('najah-step-in');
        });
    },
    { once: true }
  );

  modal.show();
}

/* ============================================================
   INTERACTIVE DECISION TREE
   ============================================================ */

const guide = document.getElementById('guideApp');

let currentCase = null;
let currentNode = null;

function guideStart() {
  if (!guide) return;

  currentCase = null;
  currentNode = null;

  guide.innerHTML = `
    <div class="guide-question mb-3">
      اختر الحالة التي تريد فهمها
    </div>

    <div class="result-note mb-4">
      إذا كانت هناك حالة طارئة حقيقية الآن، لا تعتمد على الموقع وحده.
      اتصل بالإسعاف المحلي واتبع تعليمات المختص.
    </div>

    <div class="mb-4 text-center">
      ${callEmergencyHTML}
    </div>

    <div class="guide-options">
      ${CASES.map(
        (c, index) => `
          <button
            type="button"
            class="guide-option"
            style="--case-index:${index};"
            onclick="selectGuideCase('${escapeHTML(c.id)}')"
          >
            <i class="bi ${escapeHTML(c.icon)}"></i>
            <b>${escapeHTML(c.title)}</b>
            <small class="d-block text-secondary mt-2">
              ${escapeHTML(c.short)}
            </small>
          </button>
        `
      ).join('')}
    </div>
  `;

  updateGuideProgress(1);
  animateGuideContent();
}

function selectGuideCase(id) {
  const selected = CASES.find((item) => item.id === id);

  if (!selected || !guide) return;

  currentCase = selected;
  currentNode = selected.tree;

  renderDecisionNode();
}

function renderDecisionNode() {
  if (!currentNode || !guide) return;

  if (currentNode.action) {
    showFinalResult(currentNode);
    return;
  }

  guide.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3 gap-3">
      <span class="mini-label">
        ${escapeHTML(currentCase.tag)} • ${escapeHTML(currentCase.title)}
      </span>

      <a
        href="tel:${EMERGENCY_NUMBER}"
        class="btn btn-sm btn-danger rounded-pill"
      >
        <i class="bi bi-telephone-fill ms-1"></i>
        ${EMERGENCY_NUMBER}
      </a>
    </div>

    <div class="guide-question">
      ${escapeHTML(currentNode.question)}
    </div>

    <div class="guide-options mt-4">

      <button
        type="button"
        class="guide-option text-center p-4"
        onclick="processAnswer('yes')"
      >
        <i class="bi bi-check-circle-fill text-success fs-2 d-block mb-2"></i>
        <b class="fs-4">نعم</b>
      </button>

      <button
        type="button"
        class="guide-option text-center p-4"
        onclick="processAnswer('no')"
      >
        <i class="bi bi-x-circle-fill text-danger fs-2 d-block mb-2"></i>
        <b class="fs-4">لا</b>
      </button>

    </div>

    <div class="guide-actions mt-4">
      <button
        type="button"
        class="btn btn-outline-light rounded-pill"
        onclick="guideStart()"
      >
        <i class="bi bi-arrow-right"></i>
        القائمة الرئيسية
      </button>
    </div>
  `;

  updateGuideProgress(2);
  animateGuideContent();
}

function processAnswer(choice) {
  if (!currentNode) return;

  const nextNode = currentNode[choice];

  if (!nextNode) return;

  currentNode = nextNode;
  renderDecisionNode();
}

function showFinalResult(result) {
  if (!guide) return;

  guide.innerHTML = `
    <div class="guide-result">

      <div
        class="alert alert-danger d-flex align-items-center
               justify-content-between p-3 rounded-4 mb-4 gap-3"
      >
        <div>
          <i class="bi bi-telephone-outbound-fill fs-3 me-2"></i>
          <strong class="fs-5">
            في حالة حقيقية: تواصل مع الطوارئ
          </strong>
        </div>

        <a
          href="tel:${EMERGENCY_NUMBER}"
          class="btn btn-light text-danger fw-bold rounded-pill px-4"
        >
          اتصل ${EMERGENCY_NUMBER}
        </a>
      </div>

      <h4 class="text-white mb-3">
        <i class="bi bi-shield-fill-check text-danger"></i>
        الفكرة الأساسية:
      </h4>

      <div
        class="fs-5 text-light mb-4"
        style="line-height:1.9;"
      >
        ${escapeHTML(result.action)}
      </div>

      <hr class="border-secondary">

      <h5 class="text-danger mt-3">
        <i class="bi bi-exclamation-triangle-fill"></i>
        مهم:
      </h5>

      <p class="result-note text-warning fs-6">
        ${escapeHTML(result.avoid)}
      </p>

    </div>

    <div class="guide-actions mt-4 d-flex gap-2 flex-wrap">

      <a
        href="tel:${EMERGENCY_NUMBER}"
        class="btn btn-danger rounded-pill px-4 flex-grow-1"
      >
        <i class="bi bi-telephone-fill ms-2"></i>
        الاتصال بالإسعاف ${EMERGENCY_NUMBER}
      </a>

      <button
        type="button"
        class="btn btn-outline-light rounded-pill"
        onclick="selectGuideCase('${escapeHTML(currentCase.id)}')"
      >
        <i class="bi bi-arrow-counterclockwise"></i>
        إعادة
      </button>

      <button
        type="button"
        class="btn btn-outline-light rounded-pill"
        onclick="guideStart()"
      >
        حالة أخرى
      </button>

    </div>
  `;

  updateGuideProgress(4);
  animateGuideContent();
}

function updateGuideProgress(step) {
  const progressText = document.getElementById('progressText');
  const progressBar = document.getElementById('guideProgress');

  if (progressText) {
    progressText.textContent = step + ' / 4';
  }

  if (progressBar) {
    progressBar.style.width = (step / 4) * 100 + '%';
  }
}

function animateGuideContent() {
  if (!guide) return;

  const items = guide.querySelectorAll(
    '.guide-question, .guide-option, .guide-result, .guide-actions'
  );

  items.forEach((item, index) => {
    item.classList.remove('najah-guide-in');

    setTimeout(() => {
      item.classList.add('najah-guide-in');
    }, index * 55);
  });
}

/* ============================================================
   AUTO OPEN GUIDE CASE FROM URL
   ============================================================ */

if (guide) {
  const params = new URLSearchParams(window.location.search);
  const caseId = params.get('case');

  if (caseId && CASES.some((item) => item.id === caseId)) {
    selectGuideCase(caseId);
  } else {
    guideStart();
  }
}

/* ============================================================
   SCENARIO SIMULATOR
   ============================================================ */

const scenario = document.getElementById('scenarioBox');

const scenarios = [
  {
    q: 'أنت ترى شخصًا يبدو عليه فقدان الاستجابة. ما الأولوية؟',

    a: [
      'البدء في البحث عن وصفة منزلية',
      'طلب المساعدة وتفعيل خدمات الطوارئ',
      'ترك المكان دون طلب المساعدة',
      'الانتظار حتى يتحسن',
    ],

    good: 1,

    why:
      'في حالات فقدان الاستجابة مع غياب التنفس الطبيعي، تفعيل الاستجابة الطارئة والبدء بالمساعدة المناسبة وفق التدريب أمر أساسي.',
  },

  {
    q: 'المكان نفسه قد يكون خطرًا. ماذا تفعل أولًا؟',

    a: [
      'أندفع للمساعدة مهما كان الخطر',
      'أتأكد من سلامة المكان قدر الإمكان',
      'أصور فيديو للموقف',
      'أنتظر دون طلب المساعدة',
    ],

    good: 1,

    why:
      'تقييم سلامة المكان جزء أساسي من خطوات الإسعافات الأولية؛ لا ينبغي أن يصبح المنقذ مصابًا ثانيًا.',
  },

  {
    q: 'شخص لديه علامات مفاجئة قد تشير إلى سكتة دماغية. ما الفكرة الأساسية؟',

    a: [
      'أنتظر حتى تختفي الأعراض',
      'أبحث لساعات عن علاج منزلي',
      'أتعرف على العلامات وأطلب مساعدة عاجلة',
      'أعطيه دواء من عندي',
    ],

    good: 2,

    why:
      'الوقت مهم عند الاشتباه في السكتة الدماغية، لذلك لا ينبغي تأخير التقييم الطبي بسبب الانتظار أو العلاج الذاتي.',
  },

  {
    q: 'شخص لا يستطيع الكلام أو السعال بشكل فعال ويبدو مختنقًا. ما الأولوية؟',

    a: [
      'إعطاؤه ماء',
      'تجاهل الأمر حتى يهدأ',
      'تفعيل الاستجابة الطارئة واتباع الإرشادات المناسبة للحالة',
      'إدخال الإصبع في الفم بشكل عشوائي',
    ],

    good: 2,

    why:
      'الانسداد الشديد لمجرى الهواء حالة طارئة. التقنية المناسبة تختلف حسب العمر والحالة ويجب اتباع التدريب أو تعليمات خدمات الطوارئ.',
  },
];

let scenarioIndex = 0;

function renderScenario() {
  if (!scenario) return;

  const currentScenario = scenarios[scenarioIndex];

  scenario.innerHTML = `
    <span class="scenario-kicker">
      SCENARIO ${scenarioIndex + 1}/${scenarios.length}
    </span>

    <h3>${escapeHTML(currentScenario.q)}</h3>

    ${currentScenario.a
      .map(
        (answer, index) => `
          <button
            type="button"
            class="scenario-option"
            onclick="answerScenario(${index})"
          >
            ${escapeHTML(answer)}
          </button>
        `
      )
      .join('')}

    <div id="scenarioFeedback"></div>
  `;

  scenario
    .querySelectorAll('.scenario-option')
    .forEach((button, index) => {
      button.style.animationDelay = `${index * 70}ms`;
      button.classList.add('najah-guide-in');
    });
}

function answerScenario(index) {
  const currentScenario = scenarios[scenarioIndex];
  const feedback = document.getElementById('scenarioFeedback');

  if (!feedback) return;

  if (index === currentScenario.good) {
    feedback.innerHTML = `
      <div class="scenario-feedback">
        <b class="text-success">
          ✓ اختيار مناسب
        </b>

        <p class="mb-0 mt-2">
          ${escapeHTML(currentScenario.why)}
        </p>
      </div>

      <button
        type="button"
        class="btn btn-light rounded-pill mt-3"
        onclick="nextScenario()"
      >
        التالي
      </button>
    `;
  } else {
    feedback.innerHTML = `
      <div class="scenario-feedback">
        <b class="text-warning">
          راجع الفكرة
        </b>

        <p class="mb-0 mt-2">
          في موقف طارئ، ركز على سلامة المكان وطلب المساعدة
          المناسبة بدل التأخير أو التجربة العشوائية.
        </p>
      </div>
    `;
  }
}

function nextScenario() {
  scenarioIndex = (scenarioIndex + 1) % scenarios.length;
  renderScenario();
}

renderScenario();

/* ============================================================
   OPTIONAL GLOBAL ACCESS
   Keeps compatibility with inline onclick attributes
   ============================================================ */

window.CASES = CASES;
window.openCase = openCase;
window.guideStart = guideStart;
window.selectGuideCase = selectGuideCase;
window.processAnswer = processAnswer;
window.renderDecisionNode = renderDecisionNode;
window.answerScenario = answerScenario;
window.nextScenario = nextScenario;
window.renderScenario = renderScenario;

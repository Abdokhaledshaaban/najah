const SITE_URL = 'https://abdokhaledshaaban.github.io/najah/';

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 650);
    }
  }, 450);

  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('show');
      }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((x) => io.observe(x));

  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const t = setInterval(() => {
      n = Math.min(target, n + step);
      el.textContent = n + (target === 100 ? '%' : '');
      if (n >= target) clearInterval(t);
    }, 30);
  });
});

/* ---------- Emergency Cases & Multi-Step Decision Tree Data ---------- */
const CASES = [
  {
    id: 'unknown',
    icon: 'bi-question-diamond-fill',
    title: 'لا أعلم ماذا حدث للمصاب!',
    tag: 'DIAGNOSIS',
    short: 'مسار تشخيصي سريع يعتمد على مراقبة العلامات الحيوية للوصول للإنقاذ المناسب.',
    signs: ['فقدان الوعي أو الإغماء', 'صعوبة التنفس', 'نزيف ظاهري', 'تغير في حركة الجسم'],
    tree: {
      id: 'q_un_1',
      question: 'هل المصاب يتنفس أو يستجيب لمناداته وهز كتفيه ببطء؟',
      yes: {
        id: 'q_un_2',
        question: 'هل توجد جروح مفتوحة تنزف بانتظام أو حروق/تشوهات ظاهرة على جسمه؟',
        yes: {
          action: '1. إذا كان ينزف: اضغط بكل قوتك باستخدام قطعة قماش نظيفة على مكان النزيف بشكل مباشر دون رفع يدك.\n2. إذا كان حرقاً: صب ماء صنبور عادي (فاتر) على الحرق لمدة 15 دقيقة متواصلة وغطه بقماش أو نايلون نظيف.\n3. دع المصاب مستلقياً في مكانه ولا تحركه بدون داعٍ.',
          avoid: 'لا تضع معجون أسنان، ثلج، أو قهوة على الحروق والجروح.'
        },
        no: {
          id: 'q_un_3',
          question: 'هل يلاحظ ارتخاء في أحد جانبي الوجه، ثقل في الكلام، أو ضعف في ذراع واحدة؟',
          yes: {
            action: 'هذه علامات سكتة دماغية:\n1. اجعل المصاب مستلقياً على ظهره مع رفع رأسه وكتفيه بأسنان وسائد (بزاوية 30 درجة).\n2. هدىء المصاب وراقب تنفسه بانتظام حتى وصول الإسعاف.',
            avoid: 'لا تعطِه أي شيء ليأكله أو يشربه أو يستنشقه ولا تعطِه أسبرين إطلاقاً.'
          },
          no: {
            action: 'ضعه في "وضع الإفاقة": أمله على أحد جانبيه، واجعل رأسه مائلاً للوراء قليلاً لفتح مجرى الهواء لمنع اختناقه بلسانه أو بقيئه، وابقَ بجانبه.',
            avoid: 'لا تتركه مستلقياً على ظهره إذا كان فاقداً للوعي جزئياً.'
          }
        }
      },
      no: {
        action: 'توقف في القلب والنفس (حالة طارئة قصوى):\n1. ضع المصاب على ظهره على أرضية صلبة.\n2. ضع كعب يدك الأولى في منتصف صدره تماماً (بين الثديين) وضع يدك الثانية فوق الأولى واشبك أصابعك.\n3. اضغط بقوة وسرعة للأسفل بمقدار 5 سم بمعدل 100 إلى 120 ضغطة في الدقيقة (حوالي ضغطتين كل ثانية) واستمر دون توقف حتى وصول الإسعاف.',
        avoid: 'لا تتوقف عن الضغط الصدري أكثر من 10 ثوانٍ ولا تضغط على البطن.'
      }
    },
    source: 'AHA Emergency First Aid Protocol.'
  },
  {
    id: 'stroke',
    icon: 'bi-brain',
    title: 'السكتة الدماغية',
    tag: 'TIME SENSITIVE',
    short: 'أعراض عصبية مفاجئة تحتاج إلى التعرف عليها فوراً.',
    signs: ['ارتخاء أو اعوجاج مفاجئ في الوجه.', 'ضعف أو عدم القدرة على رفع إحدى الذراعين.', 'ثقل شديد أو صعوبة في الكلام.'],
    tree: {
      id: 'q_str_1',
      question: 'هل تلاحظ اعوجاجاً في فمه عند الإبتسام، أو ضعفاً في رفع إحدى يديه؟',
      yes: {
        id: 'q_str_2',
        question: 'هل واجه صعوبة في نطق اسمه أو استيعاب كلامك عند التحدث معه؟',
        yes: {
          action: '1. اجعل المصاب يستلقي فوراً في مكان مريح.\n2. ارفع رأسه وكتفيه قليلاً باستخدام الوسائد (بزاوية 30 درجة تقريباً) لتقليل الضغط على الدماغ.\n3. افحص وقيد وقت ظهور أول أعراض بالضبط لتخبر بها طبيب الإسعاف.',
          avoid: 'لا تعطِه أي دواء (بما في ذلك الأسبرين) ولا تقدم له طعاماً أو ماءً لأن عضلات البلع قد تكون مشلولة فيختنق.'
        },
        no: {
          action: 'اجعله يستريح في وضعية جلوس مريحة وراقب تطور الأعراض بدقة.',
          avoid: 'لا تدعه يتحرك أو يقف بمفرده.'
        }
      },
      no: {
        action: 'إذا كانت الأعراض مجرد دوخة مفاجئة، اجعله يجلس في مكان آمن وبارد وشرب القليل من الماء.',
        avoid: 'لا تجعله يجهد نفسه بالقيام بأي نشاط بدني.'
      }
    },
    source: 'AHA/ASA Stroke Guidelines.'
  },
  {
    id: 'choking',
    icon: 'bi-lungs',
    title: 'الاختناق',
    tag: 'AIRWAY',
    short: 'انسداد مجرى الهواء نتيجة وجود جسم غريب.',
    signs: ['الإمساك بالرقبة بكلا اليدين.', 'عدم القدرة على الكلام.', 'تغير لون الوجه للشحوب أو الزرقة.'],
    tree: {
      id: 'q_chk_1',
      question: 'هل المصاب قادر على السعال بقوة أو إصدار أصوات؟',
      yes: {
        action: '1. شجعه باستمرار على الاستمرار في السعال بشدة.\n2. السعال الشديد هو أفضل طريقة طبيعية لإخراج الجسم الغريب من مجرى الهواء.\n3. قف بجانبه وراقبه باستمرار.',
        avoid: 'لا تضرب على ظهره وهو يسعل لأن هذا قد يدفع الجسم الغريب لأسفل بالخطأ، ولا تعطِه ماء.'
      },
      no: {
        id: 'q_chk_2',
        question: 'هل المصاب ما زال واعياً ومستيقظاً؟',
        yes: {
          action: 'مناورة هيمليك (لشخص بالغ واعٍ):\n1. قف خلف المصاب ولُف ذراعيك حول خصره.\n2. اصنع قبضة بإحدى يديك وضعها أعلى السرة مباشرة وأسفل القفص الصدري.\n3. امسك قبضتك بيدك الأخرى واضغط بقوة وسرعة للداخل وللأعلى معاً (كأنك تحاول رفعه للأعلى).\n4. كرر الضغطات حتى يخرج الجسم الغريب أو يفقد الوعي.',
          avoid: 'لا تضغط على العظام أو القفص الصدري مباشرة بل أسفله في البطن.'
        },
        no: {
          action: 'إنقاذ فاقد الوعي بسبب الاختناق:\n1. أنزل المصاب بلطف على الأرض على ظهره.\n2. افتح فمه وحاول رؤية الشئ المسبب للاختناق، وإذا كان واضحاً جداً اسحبه بإصبعك.\n3. ابدأ فوراً بعمل ضغطات صدرية (مثل CPR) بالضغط 30 مرة منتصف الصدر لطرده.',
          avoid: 'لا تدخل أصابعك بشكل عشوائي داخل الحلق إن لم تكن ترى الجسم الغريب بوضوح.'
        }
      }
    },
    source: 'AHA Adult Basic Life Support Guidelines.'
  },
  {
    id: 'cardiac',
    icon: 'bi-heart-pulse',
    title: 'توقف القلب والنفس',
    tag: 'CPR & AED',
    short: 'فقدان الاستجابة والتنفس الطبيعي.',
    signs: ['عدم الاستجابة إطلاقاً عند النداء.', 'غياب التنفس أو وجود شهقات احتضار غير منتظمة.'],
    tree: {
      id: 'q_car_1',
      question: 'عند هز كتفي الشخص والنداء بصوت عالٍ: هل يستجيب أو يتحرك؟',
      yes: {
        action: '1. ضعه في "وضع الإفاقة" (على جانبه الأيمن أو الأيسر).\n2. ثبّت رأسه مائلاً للخلف لفتح مجرى الهواء ومنع انسداده باللسان.\n3. اترك يديه وقدميه في وضع مريح وراقب تنفسه بشكل مستمر.',
        avoid: 'لا تتركه مستلقياً على ظهره.'
      },
      no: {
        id: 'q_car_2',
        question: 'ضع أذنك قرب فمه وراقب صدره لـ 5 ثوانٍ: هل يتنفس بصورة طبيعية؟',
        yes: {
          action: 'المصاب فاقد للوعي ولكنه يتنفس: ضعه فوراً في وضع الإفاقة على جانبه وراقب حركة صدره كل دقيقة.',
          avoid: 'لا تبدأ بالضغطات الصدرية طالما يتنفس بشكل طبيعي.'
        },
        no: {
          action: 'بدء الإنعاش القلبي الرئوي (CPR):\n1. انزع أو افتح الملابس عن صدر المصاب.\n2. ضع كعب يدك الأولى في مركز الصدر تماماً (بين الثديين).\n3. ضع يدك الثانية فوق الأولى واشتبك بأصابعك.\n4. اجعل ذراعيك مستقيمين تماماً واضغط بعمق 5 سم وبسرعة (100-120 ضغطة في الدقيقة - على إيقاع سريع متواصل).\n5. لا تتوقف إلا عند استعادة تنفسه أو وصول الإسعاف.',
          avoid: 'لا تتوقف عن الضغط الصدري متواصل للراحة.'
        }
      }
    },
    source: 'AHA CPR & Emergency Cardiovascular Care.'
  },
  {
    id: 'bleeding',
    icon: 'bi-droplet-half',
    title: 'النزيف الحاد',
    tag: 'BLEEDING',
    short: 'فقدان شديد للدم من جرح مفتوح.',
    signs: ['اندفاع الدم بغزارة.', 'تشبع الملابس بالدم بسرعة.'],
    tree: {
      id: 'q_bld_1',
      question: 'هل ينبعث الدم بضغط عالٍ وينبض بقوة خارج الجرح (نزيف شرياني)؟',
      yes: {
        action: '1. أحضر قماشاً نظيفاً أو ضمادة شاش وضعه فوراً فوق مكان النزيف مباشرة.\n2. اضغط بأقصى قوتك بكلا اليدين فوق الضمادة دون تخفيف الضغط إطلاقاً.\n3. ارفع الطرف المصاب (اليد أو القدم) أعلى من مستوى القلب إن لم يكن هناك كسر.\n4. إذا امتلأت القماشة بالدم، لا تزلها! بل ضع قماشة أخرى فوقها واستمر بالضغط.',
        avoid: 'لا ترفع يدك لتفحص الجرح كل شوية، ولا تضع قهوة أو ثلج أو بودرة داخل الجرح.'
      },
      no: {
        action: '1. اغسل الجرح بماء جاري نظيف لعدة دقائق لتنظيفه.\n2. اضغط بضمادة معقمة أو قماش نظيف حتى يتوقف الدم تماماً.\n3. غطِّ الجرح بشاش معقم وثبّته بلاصق طبّي.',
        avoid: 'لا تترك الجرح مكشوفاً للتلوث والأتربة.'
      }
    },
    source: 'Red Cross First Aid Bleeding Management.'
  },
  {
    id: 'burns',
    icon: 'bi-fire',
    title: 'الحروق',
    tag: 'THERMAL INJURY',
    short: 'تضرر الجلد والأنسجة بفعل الحرارة أو المواد الكيميائية.',
    signs: ['احمرار شديد وآلام', 'فقاعات مائية مملوءة بالسائل', 'جلد متفحم أو أبيض شمعي'],
    tree: {
      id: 'q_brn_1',
      question: 'هل الحرق واسع المساحة (أكبر من كف اليد) أو يتضمن تفحماً بالجلد أو فقاعات مائية كثيرة؟',
      yes: {
        action: '1. صب ماء صنبور فاتر (ليس بارداً جداً ولا ثلج) على منطقة الحرق لمدة لا تقل عن 10 إلى 20 دقيقة متواصلة.\n2. انزع أي إكسسوارات أو ساعات أو ملابس غير ملتصقة بالحرق ببطء قبل أن تتورم المنطقة.\n3. غَطِّ الحرق بلطف شديد باستخدام غلاف بلاستيكي نظيف (Cling Film الخاص بالطعام) أو ضمادة معقمة غير لاصقة.',
        avoid: 'لا تفقع الفقاعات المائية إطلاقاً، ولا تضع ثلجاً مباشراً، ولا تضع معجون أسنان أو سمن أو زبدة.'
      },
      no: {
        action: '1. ضع المنطقة المصابة تحت ماء الصنبور الجاري لمدة 10 دقائق لتهدئة الألم.\n2. ضع كريم مخصص للحروق (مثل ميبو) وغطه بشاش نظيف غير لاصق.',
        avoid: 'لا تحك الجلد ولا تستخدم مواد كيميائية غير مخصصة.'
      }
    },
    source: 'Red Cross Burn Care Guidelines.'
  },
  {
    id: 'drowning',
    icon: 'bi-water',
    title: 'الغرق',
    tag: 'WATER SAFETY',
    short: 'انسداد التنفس السريع بسبب دخول المياه لمجرى الهواء.',
    signs: ['استخراج الشخص من الماء.', 'عدم الاستجابة أو ازرقاق الشفتين.', 'خروج رغوة أو سائل من الفم.'],
    tree: {
      id: 'q_drn_1',
      question: 'بعد سحب المصاب من الماء: هل هو واعٍ ويستجيب لك ويتنفس؟',
      yes: {
        action: '1. جفف جسم المصاب بسرعة وأزل الملابس المبتلة عنه.\n2. غَطِّه ببطانية أو ملابس جافة لمنع انخفاض درجة حرارة جسمه (Hypothermia).\n3. ضعه في وضعية مريحة وراقب تنفسه باستمرار.',
        avoid: 'لا تتركه في مكان بارد ولا تدعه يستلقي على الأرض المبتلة.'
      },
      no: {
        id: 'q_drn_2',
        question: 'المصاب فاقد للوعي: هل تلاحظ حركة صدره أو تنفسه بشكل طبيعي؟',
        yes: {
          action: '1. ضعه فوراً في "وضع الإفاقة" على جانبه لمنع اختناقه بالماء أو القيء المرتجع من المعدة.\n2. امل رأسه للخلف قليلاً وراقب حركة صدره بانتظام.',
          avoid: 'لا تحاول الضغط على بطنه لإخراج الماء من معدته.'
        },
        no: {
          action: 'إنقاذ غريق فاقد للوعي ولا يتنفس:\n1. ضع المصاب على ظهره على أرض جافة وصفحة صلبة.\n2. افتح مجرى الهواء بإمالة رأسه للخلف ورفع ذقنه للأعلى.\n3. اعطِه 5 أنفاس إنقاذية أُولى (انفخ الهواء بقوة في فمه مع إغلاق أنفه حتى يرتقي صدره).\n4. ابدأ فوراً بدورة الإنعاش (30 ضغطة صدرية منتصف الصدر ثم نفصين إنقاذيين) واستمر دون توقف.',
          avoid: 'لا تضيع أي ثانية في محاولة الضغط على البطن لعصر الماء من الرئتين؛ الأكسجين فوراً هو الأهم.'
        }
      }
    },
    source: 'AHA / Red Cross Resuscitation & Drowning Guidelines.'
  }
];

/* ---------- Render Cards ---------- */
const grid = document.getElementById('caseGrid');
ProfesionalRenderCards();

function ProfesionalRenderCards() {
  if (!grid) return;
  grid.innerHTML = CASES.map(
    (c) => `<div class="col-md-6 col-lg-4"><article class="condition-card reveal show">
  <div class="condition-icon"><i class="bi ${c.icon}"></i></div><span class="mini-label d-block mt-3">${c.tag}</span>
  <h3>${c.title}</h3><p class="short">${c.short}</p><h6>علامات تشخيصية</h6><ul>${c.signs
    .map((s) => `<li>${s}</li>`)
    .join('')}</ul>
  <button class="btn btn-outline-light rounded-pill mt-2" onclick="openCase('${c.id}')">عرض التفاصيل <i class="bi bi-arrow-left"></i></button></article></div>`
  ).join('');
}

function openCase(id) {
  const c = CASES.find((x) => x.id === id);
  if (!c) return;
  const old = document.getElementById('caseModal');
  if (old) old.remove();
  
  const formattedAction = c.tree.yes ? (c.tree.yes.action ? c.tree.yes.action.replace(/\n/g, '<br>') : c.tree.yes.yes.action.replace(/\n/g, '<br>')) : c.tree.action ? c.tree.action.replace(/\n/g, '<br>') : 'اقرأ خطوات التشخيص التفاعلي.';
  const formattedAvoid = c.tree.yes ? (c.tree.yes.avoid ? c.tree.yes.avoid : c.tree.yes.yes.avoid) : c.tree.avoid;

  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal fade" id="caseModal" tabindex="-1"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content modal-dark">
 <div class="modal-header border-secondary"><div><span class="mini-label">${c.tag}</span><h3>${c.title}</h3></div><button class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>
 <div class="modal-body"><p class="result-note">${c.short}</p><h5>علامات مهمة</h5><ul>${c.signs.map((s) => `<li class="mb-2">${s}</li>`).join('')}</ul>
 <h5 class="mt-4">التصرف المباشر</h5><div class="guide-result">${formattedAction}</div>
 <h5 class="mt-4 text-danger">تجنب تماماً</h5><div class="result-note text-warning">${formattedAvoid}</div>
 <div class="mt-4 text-center">
   <a href="tel:123" class="btn btn-danger btn-lg rounded-pill px-4"><i class="bi bi-telephone-fill ms-2"></i> اتصل بالإسعاف (123)</a>
 </div>
 <div class="safety-note mt-4"><i class="bi bi-shield-check"></i> ${c.source}</div></div>
 <div class="modal-footer border-secondary"><button class="btn btn-outline-light rounded-pill" data-bs-dismiss="modal">إغلاق</button><a href="guide.html?case=${c.id}" class="btn btn-danger rounded-pill">بدء التشخيص التفاعلي</a></div>
 </div></div></div>`
  );
  new bootstrap.Modal('#caseModal').show();
}

/* ---------- Decision Tree Interactive Engine ---------- */
const guide = document.getElementById('guideApp');
let currentCase = null;
let currentNode = null;

function guideStart() {
  if (!guide) return;
  guide.innerHTML = `
    <div class="guide-question mb-3"> في كل الحالات اتصل بالاسعاف وابتعد في حالة وجود شخص لديه علم بالاسعافات الاولية </div>
    <div class="mb-4 text-center">
       <a href="tel:123" class="btn btn-danger rounded-pill w-100 py-3 fs-5 shadow"><i class="bi bi-telephone-fill ms-2"></i> اتصل بالإسعاف فوراً (123)</a>
    </div>
    <div class="guide-options">
      ${CASES.map((c) => `
        <button class="guide-option ${c.id === 'unknown' ? 'border-danger bg-dark' : ''}" onclick="selectGuideCase('${c.id}')">
          <i class="bi ${c.icon} ${c.id === 'unknown' ? 'text-danger fs-3' : ''}"></i>
          <b>${c.title}</b>
          <small class="d-block text-secondary mt-2">${c.short}</small>
        </button>
      `).join('')}
    </div>`;
  updateGuideProgress(1);
}

function selectGuideCase(id) {
  currentCase = CASES.find((x) => x.id === id);
  if (!currentCase) return;
  currentNode = currentCase.tree;
  renderDecisionNode();
}

function renderDecisionNode() {
  if (!currentNode || !guide) return;

  if (currentNode.action) {
    showFinalResult(currentNode);
    return;
  }

  guide.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <span class="mini-label">${currentCase.tag} • ${currentCase.title}</span>
      <a href="tel:123" class="btn btn-sm btn-danger rounded-pill"><i class="bi bi-telephone-fill ms-1"></i> إسعاف 123</a>
    </div>
    <div class="guide-question">${currentNode.question}</div>
    <div class="guide-options mt-4">
      <button class="guide-option text-center p-4" onclick="processAnswer('yes')">
        <i class="bi bi-check-circle-fill text-success fs-2 d-block mb-2"></i>
        <b class="fs-4">نــعــم</b>
      </button>
      <button class="guide-option text-center p-4" onclick="processAnswer('no')">
        <i class="bi bi-x-circle-fill text-danger fs-2 d-block mb-2"></i>
        <b class="fs-4">لا</b>
      </button>
    </div>
    <div class="guide-actions mt-4 d-flex justify-content-between">
      <button class="btn btn-outline-light rounded-pill" onclick="guideStart()"><i class="bi bi-arrow-right"></i> القائمة الرئيسية</button>
    </div>`;
  updateGuideProgress(2);
}

function processAnswer(choice) {
  const next = currentNode[choice];
  if (!next) return;

  if (typeof next === 'object') {
    currentNode = next;
    renderDecisionNode();
  }
}

function showFinalResult(res) {
  const formattedAction = res.action.replace(/\n/g, '<br>');
  guide.innerHTML = `
    <div class="guide-result">
      <div class="alert alert-danger d-flex align-items-center justify-content-between p-3 rounded-4 mb-4">
        <div>
           <i class="bi bi-telephone-outbound-fill fs-3 me-2"></i>
           <strong class="fs-5">تواصل مع الطوارئ فوراً</strong>
        </div>
        <a href="tel:123" class="btn btn-light text-danger fw-bold rounded-pill px-4">اتصل 123</a>
      </div>
      <h4 class="text-white mb-3"><i class="bi bi-shield-fill-check text-danger"></i> الإجراء الفوري الموصى به:</h4>
      <div class="fs-5 text-light mb-4" style="line-height:1.9;">${formattedAction}</div>
      <hr class="border-secondary">
      <h5 class="text-danger mt-3"><i class="bi bi-exclamation-triangle-fill"></i> تحذير هام جداً:</h5>
      <p class="result-note text-warning fs-6">${res.avoid}</p>
    </div>
    <div class="guide-actions mt-4 d-flex gap-2 flex-wrap">
      <a href="tel:123" class="btn btn-danger rounded-pill px-4 flex-grow-1"><i class="bi bi-telephone-fill ms-2"></i> الاتصال بالإسعاف (123)</a>
      <button class="btn btn-outline-light rounded-pill" onclick="selectGuideCase('${currentCase.id}')"><i class="bi bi-arrow-counterclockwise"></i> إعادة</button>
      <button class="btn btn-outline-light rounded-pill" onclick="guideStart()">حالة أخرى</button>
    </div>`;
  updateGuideProgress(4);
}

function updateGuideProgress(n) {
  const t = document.getElementById('progressText'),
    p = document.getElementById('guideProgress');
  if (t) t.textContent = n + ' / 4';
  if (p) p.style.width = (n / 4) * 100 + '%';
}

if (guide) {
  const params = new URLSearchParams(location.search);
  const id = params.get('case');
  if (id) {
    selectGuideCase(id);
  } else {
    guideStart();
  }
}

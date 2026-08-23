const SITE_URL = 'https://abdokhaledshaaban.github.io/najah/'; // غيّر هذا إلى رابط الموقع النهائي قبل العرض

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

  const q = document.getElementById('qrcode');
  if (q && typeof QRCode !== 'undefined') {
    new QRCode(q, {
      text: SITE_URL,
      width: 220,
      height: 220,
      colorDark: '#101318',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    });
    const u = document.getElementById('siteUrlPreview');
    if (u) u.textContent = SITE_URL;
  }

  const checklist = document.getElementById('checklist');
  if (checklist) {
    const boxes = [...checklist.querySelectorAll('input')],
      score = document.getElementById('score');
    boxes.forEach((b) =>
      b.addEventListener('change', () => {
        const p = Math.round(
          (boxes.filter((x) => x.checked).length / boxes.length) * 100
        );
        score.textContent = p + '%';
      })
    );
  }
});

/* ---------- Emergency data ---------- */
const CASES = [
  {
    id: 'stroke',
    icon: 'bi-brain',
    title: 'السكتة الدماغية',
    tag: 'TIME SENSITIVE',
    short: 'أعراض عصبية مفاجئة تحتاج إلى التعرف عليها وطلب المساعدة بسرعة.',
    signs: [
      'ضعف أو تنميل مفاجئ، خصوصًا في جانب واحد.',
      'صعوبة مفاجئة في الكلام أو الفهم.',
      'اضطراب مفاجئ في الرؤية أو المشي أو التوازن.',
      'صداع شديد مفاجئ قد يصاحب بعض الحالات.',
    ],
    doText:
      'التعرف على العلامات، طلب المساعدة الطبية العاجلة، وتسجيل وقت بداية الأعراض إن أمكن.',
    avoid: [
      'لا تؤخر طلب المساعدة بسبب البحث الطويل.',
      'لا تفترض أن الأعراض ستختفي من تلقاء نفسها.',
    ],
    source: 'إرشادات الإسعافات الأولية AHA/Red Cross 2024.',
  },
  {
    id: 'choking',
    icon: 'bi-lungs',
    title: 'الاختناق',
    tag: 'AIRWAY',
    short:
      'انسداد مجرى الهواء قد يكون خطيرًا، والاستجابة تختلف حسب العمر وشدة الانسداد.',
    signs: [
      'صعوبة شديدة في التنفس أو الكلام.',
      'عدم القدرة على السعال بشكل فعال.',
      'تدهور الوعي أو فقدان الاستجابة.',
    ],
    doText:
      'قيّم شدة الحالة واطلب المساعدة المناسبة. المهارات العملية للاختناق يجب تعلمها من تدريب معتمد لأن الخطوات تختلف حسب العمر والحالة.',
    avoid: [
      'لا تستخدم أسلوبًا واحدًا لكل الأعمار.',
      'لا تجعل البحث في الموقع يؤخر طلب المساعدة في حالة حقيقية.',
    ],
    source: 'AHA 2025 Adult Basic Life Support + AHA/Red Cross First Aid 2024.',
  },
  {
    id: 'cardiac',
    icon: 'bi-heart-pulse',
    title: 'توقف القلب / فقدان الاستجابة',
    tag: 'CPR & AED',
    short:
      'فقدان الاستجابة والتنفس الطبيعي علامة تستدعي تفعيل الاستجابة الطارئة فورًا.',
    signs: ['الشخص لا يستجيب.', 'لا يوجد تنفس طبيعي أو يوجد تنفس غير طبيعي.'],
    doText:
      'تفعيل خدمات الطوارئ واتباع تعليمات عامل الطوارئ. تعلم CPR واستخدام AED عمليًا من دورة معتمدة.',
    avoid: [
      'لا تنتظر لتتأكد بشكل طويل.',
      'لا تعتمد على الموقع بدل خدمات الطوارئ أو التدريب.',
    ],
    source: 'AHA 2025 Adult Basic Life Support Guidelines.',
  },
  {
    id: 'bleeding',
    icon: 'bi-droplet-half',
    title: 'النزيف الشديد',
    tag: 'BLEEDING',
    short:
      'النزيف الخارجي المهدد للحياة يحتاج إلى استجابة سريعة ومساعدة مناسبة.',
    signs: [
      'نزيف غزير أو مستمر.',
      'نزيف لا يبدو أنه يتوقف مع الرعاية الأولية المناسبة.',
      'علامات تدهور عام أو ضعف شديد.',
    ],
    doText:
      'احمِ نفسك، اطلب المساعدة عند النزيف الشديد، واستخدم وسائل السيطرة على النزيف التي تعلمتها في تدريب معتمد.',
    avoid: [
      'لا تعرض نفسك لدم شخص آخر دون احتياطات مناسبة.',
      'لا تؤخر طلب المساعدة في النزيف الخطير.',
    ],
    source: 'AHA/Red Cross First Aid Guidelines 2024.',
  },
  {
    id: 'burns',
    icon: 'bi-fire',
    title: 'الحروق',
    tag: 'THERMAL INJURY',
    short: 'تختلف الحروق في شدتها، وبعضها يحتاج إلى تقييم طبي عاجل.',
    signs: [
      'حرق واسع أو عميق.',
      'إصابة في مناطق حساسة أو صعوبة في التنفس.',
      'تدهور الحالة أو ألم شديد.',
    ],
    doText:
      'أبعد الشخص عن مصدر الخطر إذا كان ذلك آمنًا، واطلب التقييم الطبي للحروق الكبيرة أو العميقة. تجنب الممارسات المنزلية غير الموثوقة.',
    avoid: [
      'لا تضع الثلج مباشرة على الحرق.',
      'لا تستخدم وصفات منزلية غير موثوقة.',
    ],
    source: 'AHA/Red Cross First Aid Guidelines 2024.',
  },
  {
    id: 'drowning',
    icon: 'bi-water',
    title: 'الغرق',
    tag: 'WATER SAFETY',
    short:
      'الغرق حالة نقص أكسجين وتحتاج إلى استجابة عاجلة مع الحفاظ على سلامة المنقذ.',
    signs: [
      'عدم الاستجابة بعد الخروج من الماء.',
      'صعوبة أو غياب التنفس الطبيعي.',
      'تدهور بعد حادث غرق.',
    ],
    doText:
      'لا تعرض نفسك للخطر أثناء الإنقاذ، واطلب خدمات الطوارئ واتبع تعليمات المختصين. التدريب العملي مهم جدًا.',
    avoid: ['لا تدخل الماء إذا كان ذلك سيعرضك للخطر.', 'لا تؤخر طلب المساعدة.'],
    source: 'AHA 2025 Special Circumstances of Resuscitation + First Aid 2024.',
  },
];

const grid = document.getElementById('caseGrid');
if (grid) {
  grid.innerHTML = CASES.map(
    (
      c
    ) => `<div class="col-md-6 col-lg-4"><article class="condition-card reveal show">
  <div class="condition-icon"><i class="bi ${c.icon}"></i></div><span class="mini-label d-block mt-3">${c.tag}</span>
  <h3>${c.title}</h3><p class="short">${c.short}</p><h6>علامات مهمة</h6><ul>${c.signs
    .slice(0, 3)
    .map((s) => `<li>${s}</li>`)
    .join('')}</ul>
  <button class="btn btn-outline-light rounded-pill mt-2" onclick="openCase('${c.id}')">عرض الحالة <i class="bi bi-arrow-left"></i></button></article></div>`
  ).join('');
}
function openCase(id) {
  const c = CASES.find((x) => x.id === id);
  if (!c) return;
  const old = document.getElementById('caseModal');
  if (old) old.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal fade" id="caseModal" tabindex="-1"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content modal-dark">
 <div class="modal-header border-secondary"><div><span class="mini-label">${c.tag}</span><h3>${c.title}</h3></div><button class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>
 <div class="modal-body"><p class="result-note">${c.short}</p><h5>علامات مهمة</h5><ul>${c.signs.map((s) => `<li class="mb-2">${s}</li>`).join('')}</ul>
 <h5 class="mt-4">ما يركز عليه الحل</h5><div class="guide-result">${c.doText}</div>
 <h5 class="mt-4">ما يجب تجنبه</h5><ul>${c.avoid.map((s) => `<li class="mb-2">${s}</li>`).join('')}</ul>
 <div class="safety-note mt-4"><i class="bi bi-shield-check"></i> ${c.source} هذا المحتوى تعليمي ويحتاج مراجعة محلية قبل الاستخدام الواقعي.</div></div>
 <div class="modal-footer border-secondary"><button class="btn btn-outline-light rounded-pill" data-bs-dismiss="modal">إغلاق</button><a href="guide.html?case=${c.id}" class="btn btn-danger rounded-pill">الدليل التفاعلي</a></div>
 </div></div></div>`
  );
  new bootstrap.Modal('#caseModal').show();
}

/* ---------- Guide engine ---------- */
const guide = document.getElementById('guideApp');
let currentCase = null,
  guideStep = 1;
function guideStart() {
  guideStep = 1;
  guide.innerHTML = `<div class="guide-question">ما نوع الحالة التي تريد فهمها؟</div><div class="guide-options">${CASES.map((c) => `<button class="guide-option" onclick="selectGuideCase('${c.id}')"><i class="bi ${c.icon}"></i><b>${c.title}</b><small class="d-block text-secondary mt-2">${c.short}</small></button>`).join('')}</div>`;
  updateGuideProgress(1);
}
function selectGuideCase(id) {
  currentCase = CASES.find((x) => x.id === id);
  guideStep = 2;
  renderGuideQuestion();
}
function renderGuideQuestion() {
  if (!currentCase) return;
  guide.innerHTML = `<div class="guide-question">هل هذه حالة طارئة حقيقية الآن؟</div>
 <p class="result-note">هذا السؤال جزء من تصميم التجربة. إذا كانت الإجابة نعم، الأولوية هي طلب خدمات الطوارئ المحلية، وليس الاستمرار في تصفح الموقع.</p>
 <div class="guide-options"><button class="guide-option" onclick="guideEmergency()"><i class="bi bi-exclamation-triangle-fill"></i><b>نعم، هناك حالة حقيقية</b></button>
 <button class="guide-option" onclick="guideLearning()"><i class="bi bi-book"></i><b>لا، أنا أتعلم فقط</b></button></div>
 <div class="guide-actions"><button class="btn btn-outline-light rounded-pill" onclick="guideStart()">تغيير الحالة</button></div>`;
  updateGuideProgress(2);
}
function guideEmergency() {
  guideStep = 3;
  guide.innerHTML = `<div class="guide-result"><h4><i class="bi bi-shield-exclamation text-danger"></i> أوقف التصفح إذا كان هناك خطر فوري.</h4>
 <p class="result-note">اطلب خدمات الطوارئ المحلية الآن واتبع تعليمات المختص. لا تستخدم هذا النموذج بدل الرعاية المهنية.</p>
 <hr class="border-secondary"><h5>${currentCase.title}</h5><p class="result-note">${currentCase.doText}</p></div>
 <div class="guide-actions"><a href="tel:123" class="btn btn-danger rounded-pill"><i class="bi bi-telephone-fill"></i> اتصال بالطوارئ</a><button class="btn btn-outline-light rounded-pill" onclick="guideStart()">ابدأ من جديد</button></div>`;
  updateGuideProgress(3);
}
function guideLearning() {
  guideStep = 3;
  guide.innerHTML = `<div class="guide-question">ما الذي تريد معرفته عن ${currentCase.title}؟</div>
 <div class="guide-options"><button class="guide-option" onclick="guideSigns()"><i class="bi bi-eye"></i><b>العلامات المهمة</b></button><button class="guide-option" onclick="guideDo()"><i class="bi bi-list-check"></i><b>فكرة الاستجابة</b></button></div>
 <div class="guide-actions"><button class="btn btn-outline-light rounded-pill" onclick="renderGuideQuestion()">رجوع</button></div>`;
  updateGuideProgress(3);
}
function guideSigns() {
  guideStep = 4;
  guide.innerHTML = `<div class="guide-question">علامات مهمة يجب معرفتها</div><div class="guide-result">${currentCase.signs.map((s, i) => `<div class="step d-flex gap-3 mb-3"><span class="step-num">${i + 1}</span><span>${s}</span></div>`).join('')}</div><div class="guide-actions"><button class="btn btn-danger rounded-pill" onclick="guideDo()">ما الفكرة العامة للاستجابة؟</button><button class="btn btn-outline-light rounded-pill" onclick="guideStart()">حالة أخرى</button></div>`;
  updateGuideProgress(4);
}
function guideDo() {
  guideStep = 4;
  guide.innerHTML = `<div class="guide-question">فكرة الحل في NAJAH</div><div class="guide-result"><h4>الأولوية: السلامة + المساعدة المناسبة</h4><p class="result-note">${currentCase.doText}</p><h5 class="mt-4">أشياء نتجنبها</h5><ul>${currentCase.avoid.map((x) => `<li class="mb-2">${x}</li>`).join('')}</ul></div><div class="guide-actions"><button class="btn btn-outline-light rounded-pill" onclick="guideStart()">حالة أخرى</button><a class="btn btn-danger rounded-pill" href="cases.html">مكتبة الحالات</a></div>`;
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
  } else guideStart();
}

/* ---------- Scenario simulator ---------- */
const scenario = document.getElementById('scenarioBox');
const scenarios = [
  {
    q: 'أنت ترى شخصًا يبدو عليه فقدان الاستجابة. ما الأولوية؟',
    a: [
      'البدء في البحث عن وصفة منزلية',
      'طلب المساعدة وتفعيل خدمات الطوارئ',
      'ترك المكان فورًا دون طلب المساعدة',
      'الانتظار حتى يتحسن',
    ],
    good: 1,
    why: 'في حالات فقدان الاستجابة، تفعيل الاستجابة الطارئة أولوية. تفاصيل CPR العملية يجب تعلمها من تدريب معتمد واتباع تعليمات خدمات الطوارئ.',
  },
  {
    q: 'أمامك موقف غير واضح، والمكان نفسه قد يكون خطرًا. ماذا تفعل أولًا؟',
    a: [
      'أندفع للمساعدة فورًا مهما كان الخطر',
      'أتأكد من سلامة المكان قدر الإمكان',
      'أصور فيديو للموقف',
      'أنتظر شخصًا آخر دون فعل شيء',
    ],
    good: 1,
    why: 'إرشادات الإسعافات الأولية تؤكد أن سلامة مقدم المساعدة وتقييم المشهد من المبادئ الأساسية.',
  },
  {
    q: 'شخص لديه أعراض مفاجئة قد تشير إلى سكتة دماغية. ما الفكرة الأساسية؟',
    a: [
      'أنتظر حتى تختفي الأعراض',
      'أبحث لساعات عن علاج منزلي',
      'أتعرف على العلامات وأطلب مساعدة عاجلة',
      'أعطيه دواء من عندي',
    ],
    good: 2,
    why: 'التعرف على العلامات وطلب المساعدة العاجلة أهم من تأخير الرعاية بسبب البحث أو التجربة الذاتية.',
  },
];
let si = 0;
function renderScenario() {
  if (!scenario) return;
  const s = scenarios[si];
  scenario.innerHTML = `<span class="scenario-kicker">SCENARIO ${si + 1}/${scenarios.length}</span><h3>${s.q}</h3>${s.a.map((x, i) => `<button class="scenario-option" onclick="answerScenario(${i})">${x}</button>`).join('')}<div id="scenarioFeedback"></div>`;
}
function answerScenario(i) {
  const s = scenarios[si],
    box = document.getElementById('scenarioFeedback');
  box.innerHTML =
    i === s.good
      ? `<div class="scenario-feedback"><b class="text-success">✓ اختيار مناسب</b><p class="mb-0 mt-2">${s.why}</p></div><button class="btn btn-light rounded-pill mt-3" onclick="nextScenario()">التالي</button>`
      : `<div class="scenario-feedback"><b class="text-warning">راجع الفكرة</b><p class="mb-0 mt-2">في موقف طارئ، ركز على السلامة وطلب المساعدة المناسبة بدل التأخير أو التجربة العشوائية.</p></div>`;
}
function nextScenario() {
  si = (si + 1) % scenarios.length;
  renderScenario();
}
renderScenario();

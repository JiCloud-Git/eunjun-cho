document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById('nav');
  const backToTop = document.getElementById('backToTop');
  const scrollProgress = document.getElementById('scrollProgress');
  const heroGlow1 = document.querySelector('.hero-glow-1');
  const heroGlow2 = document.querySelector('.hero-glow-2');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let scrollQueued = false;
  const updateScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    backToTop.classList.toggle('show', y > 400);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = `${docHeight > 0 ? Math.min(y / docHeight, 1) * 100 : 0}%`;

    if (!reduceMotion) {
      if (heroGlow1) heroGlow1.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
      if (heroGlow2) heroGlow2.style.transform = `translate3d(0, ${y * -0.1}px, 0)`;
    }
    scrollQueued = false;
  };
  const onScroll = () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(updateScroll);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  updateScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const navLinks = document.querySelectorAll('.nav-link');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  document.querySelectorAll('section[id]').forEach((section) => navObserver.observe(section));

  /* ---------- Fade-up on scroll ---------- */
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.stagger').forEach((el, i) => {
          el.style.transitionDelay = `${Math.min(i, 8) * 90}ms`;
          el.classList.add('visible');
        });
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up').forEach((el) => fadeObserver.observe(el));

  /* ---------- Career stat count-up ---------- */
  if (!reduceMotion) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        const suffix = el.querySelector('.career-stat-plus')?.outerHTML || '';
        const duration = 1200;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.innerHTML = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        statObserver.unobserve(el);
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('.career-stat-num[data-count]').forEach((el) => statObserver.observe(el));
  }

  /* ---------- Back to top ---------- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Career events ---------- */
  const careerEvents = {
    2025: [
      'KU NEXT STARTUP WEEK · KU Global Conference',
      '2025 화물자동차 에코 드라이빙 캠페인 시상식',
      'KU-정운오 Global Startup Festival 창업경진대회',
      '2025 4S대학 대학혁신지원사업 공동 성과포럼',
      '인공지능 서비스 이용자 보호 컨퍼런스',
      '2025 종로구 평생교육 성과보고회',
      '에너지경제연구원 2025 연구성과 발표회',
      '2025 지역창업 인프라 통합 성과보고회',
      '평택-중국 우호도시 공동번영 교류회',
      'NIPA 해외거점 성과공유회',
      '경기북부 스마트제조혁신 확산 성과공유회',
      '고려대 & 건국대 K² Pre TeX-Corps Final Pitch Day',
      '재도전 응원본부 발대식',
      '정신의료기관 응급병상정보 공유시스템 설명회',
      '한국지역난방공사 대구지사 친환경발전소 준공식',
      'SW 고성장클럽 성과공유회',
      '교원해외파견사업 성과와 미래 포럼',
      '2025 지자체 총괄 공공건축가 콜로키움',
      '제조안전 얼라이언스 협의체 발족식',
      '평택시 통합 30주년 기념 성화 채화식',
      '2025 하반기 개인정보 정책포럼',
      '강원 임산부와 동행 10주년 기념행사',
      '제18회 마포나루 새우젓 축제',
      '4단계 BK21 대학원 혁신 성과공유회',
      '2025 서울신문 강원 인구포럼',
      '스마트 라이프워크 2025 (SLW)',
      '구로 책 축제',
      '스마트건설챌린지 · 철도분야 기술 경연대회',
      'SKY Innovation IR Day 2025',
      '인천스타트업위크 SURF 2025',
      '제24회 한국 소믈리에 대회',
      'ISEC 2025 · CISO 역량강화 워크숍 / CPO 워크숍',
      '2025 인공지능·디지털 기반 교육혁신 컨퍼런스',
      'K-Display 2025 채용박람회',
      '대한민국 항공보안 경진대회 개·폐회식',
      'WSCE 2025 특별 컨퍼런스',
      '메디스태프 1st 개원 페스티벌',
      '2025 상반기 국토안전 동반성장 포럼',
      "스타트업 법률지원 '찾아가는 법률상담회'",
      '강남구 행복일자리 박람회 개막식',
      'NextRise 2025 Seoul · 피칭스테이션',
      '해사 사이버안전 전문가 포럼',
      '대한민국 NFT·블록체인 게임 컨퍼런스',
      '제주 푸드 앤 와인페스티벌',
      '스타트업 법률자문단 위촉식',
      'PIS FAIR 2025',
      'LaLaLa 천안 어린이 축제',
      '3ALogics 21주년 창립기념 비전선포식',
      '교육부-한전 업무협약식 및 채용설명회',
      'SECON & eGISEC 2025',
      '양평동 공공복합시설 착공식',
      '2025 연세 BIZ Partners Day',
    ],
    2024: [
      "과학영재교육 페스티벌 '사이브릿지 플러스'",
      '차세대 미디어 페스티벌',
      'AI·메타버스 기반 재난안전관리체계 강화사업 성과교류회',
      "산업 디지털 전환 컨퍼런스 'DXCON'",
      '인천문화재단 창립 20주년 기념행사',
      '디지털 혁신기업 글로벌 성장 바우처 성과공유회',
      '빅토리 프로그램 24기 수료식 및 투자라운드',
      '제2회 성남 기업성장 포럼',
      'ICT 이노베이션스퀘어 성과공유회 및 시상식',
      "'방문 똑똑! 마음 톡톡!' 사업 성과공유회",
      '한의약 육성 지역계획 성과보고회 및 설명회',
      'AI로 세상을 바꾸는 DPG 챌린지·해커톤 시상식',
      '서울기계리더스포럼',
      '미래혁신표준 세미나 개회식',
      '미래내일 일경험 사업 최종 성과발표회',
      'IP 브랜드데이 피칭세션',
      'KICXUP GLOBAL 2024 오픈이노베이션',
      '스마트건설챌린지 · 도로분야 기술 경연대회',
      'DMTS 2024 디지털미디어테크쇼 컨퍼런스',
      '군자농협 경제사업소 개점식',
      '코리아 메타버스 페스티벌 (KMF)',
      'ISEC 2024 CPO 워크숍',
      '제3회 주민총회 및 방축골 풍물한마당 축제',
      '제18회 글로벌 인적자원개발 컨퍼런스',
      '강남구 행복일자리 박람회',
      '한국 소믈리에 대회 시상식',
      '한국해사주간 사이버안전 전문가 포럼',
      'HR 리더스 인사이트 컨퍼런스',
      '워프렌즈 창립 25주년 행사',
      'WSCE 국토도시 데이터분석대전',
      'V-포럼 (VICTORY 프로그램)',
      '도농교류의 날 기념행사 · 농촌 여름휴가 페스티벌',
      'HR 리더스 인사이트 컨퍼런스',
      'PIS FAIR 2024',
      '국가철도공단 인재개발원 개원식',
      '제주포럼',
      '아이더스FNB 준공식',
      '산업데이터 퓨처콘',
      '서울 디자인주도 제조혁신센터 이전 기념식',
    ],
    2023: [
      '제2차 아동정책포럼',
      '하나은행 VIP 초청 자산관리 콘서트',
      '대한민국 관광기념품 박람회',
      '2024 트렌드쇼',
      '양자센서 시장 및 산업 활성화 세미나',
      '코리아 마이스 엑스포',
      "'아이스크림' 연수원 토크쇼",
      '환경신기술·혁신제품 녹색기술 발표회',
      '축산 스마트팜 수출공동브랜드 참여기업 설명회',
      "'아이스크림' 연수원 토크쇼 촬영",
      '스마트건설챌린지 · 철도분야 기술 경연대회',
      '대한민국 EMC FEST',
      '인제 합강문화제 개막식',
      '인적자원개발 컨퍼런스',
      '제5회 곤충의 날 기념식',
      'WSCE 월드 스마트시티 엑스포',
      '제12회 국제 정보보호 컨퍼런스',
    ],
    2022: [
      '제10회 서울특별시 어린이·청소년 희망총회',
      '경기남부 맑은하천 사회공헌사업 성과공유회',
      "헬로콘서트 '좋은날'",
      '마포구 청소년 페스티벌',
      '제16회 국제 시큐리티 컨퍼런스 (ISEC 2022)',
    ],
  };

  const EVENT_PREVIEW_COUNT = 12;
  const yearTabs = document.querySelectorAll('.year-tab');
  const eventList = document.getElementById('eventList');
  const showMoreBtn = document.getElementById('showMoreBtn');
  let currentYear = '2025';
  let eventsExpanded = false;

  function renderEvents() {
    const items = careerEvents[currentYear];
    const visible = eventsExpanded ? items : items.slice(0, EVENT_PREVIEW_COUNT);
    eventList.innerHTML = visible.map((item) => `<li>${item}</li>`).join('');

    if (items.length > EVENT_PREVIEW_COUNT) {
      showMoreBtn.style.display = 'flex';
      showMoreBtn.textContent = eventsExpanded ? '접기' : `${currentYear}년 행사 전체 ${items.length}건 보기`;
    } else {
      showMoreBtn.style.display = 'none';
    }
  }

  yearTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      yearTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentYear = tab.dataset.year;
      eventsExpanded = false;
      renderEvents();
    });
  });

  showMoreBtn.addEventListener('click', () => {
    eventsExpanded = !eventsExpanded;
    renderEvents();
  });

  renderEvents();

  /* ---------- Portfolio gallery ---------- */
  const galleryItems = [
    { src: 'images/broadcast-1.jpg', category: 'broadcast', label: '방송·뉴스', caption: '지역 뉴스 현장 리포트' },
    { src: 'images/broadcast-2.jpg', category: 'broadcast', label: '방송·뉴스', caption: 'NWS 방송 뉴스 앵커' },
    { src: 'images/broadcast-3.jpg', category: 'broadcast', label: '방송·뉴스', caption: 'NWS 방송 뉴스 앵커' },
    { src: 'images/broadcast-4.jpg', category: 'broadcast', label: '방송·뉴스', caption: 'NWS 방송 뉴스 앵커' },

    { src: 'images/economic-1.jpg', category: 'economic', label: '경제', caption: '경제 전문 프로그램 진행' },
    { src: 'images/economic-2.jpg', category: 'economic', label: '경제', caption: '경제 전문 프로그램 진행' },
    { src: 'images/economic-3.jpg', category: 'economic', label: '경제', caption: '경제 전문 프로그램 진행' },
    { src: 'images/economic-4.jpg', category: 'economic', label: '경제', caption: '경제 전문 프로그램 진행' },
    { src: 'images/economic-5.jpg', category: 'economic', label: '경제', caption: '경제 전문 프로그램 진행' },
    { src: 'images/economic-6.jpg', category: 'economic', label: '경제', caption: '경제 전문 프로그램 진행' },

    { src: 'images/event-1.jpg', category: 'event', label: '행사·컨퍼런스', caption: '컨퍼런스 · 행사 MC' },
    { src: 'images/event-2.jpg', category: 'event', label: '행사·컨퍼런스', caption: '컨퍼런스 · 행사 MC' },
    { src: 'images/event-3.jpg', category: 'event', label: '행사·컨퍼런스', caption: '컨퍼런스 · 행사 MC' },
    { src: 'images/event-4.jpg', category: 'event', label: '행사·컨퍼런스', caption: '컨퍼런스 · 행사 MC' },
    { src: 'images/event-5.jpg', category: 'event', label: '행사·컨퍼런스', caption: '컨퍼런스 · 행사 MC' },
    { src: 'images/event-6.jpg', category: 'event', label: '행사·컨퍼런스', caption: '컨퍼런스 · 행사 MC' },
    { src: 'images/event-7.jpg', category: 'event', label: '행사·컨퍼런스', caption: '컨퍼런스 · 행사 MC' },
    { src: 'images/event-8.jpg', category: 'event', label: '행사·컨퍼런스', caption: '컨퍼런스 · 행사 MC' },
    { src: 'images/event-9.jpg', category: 'event', label: '행사·컨퍼런스', caption: '컨퍼런스 · 행사 MC' },
    { src: 'images/event-10.jpg', category: 'event', label: '행사·컨퍼런스', caption: '컨퍼런스 · 행사 MC' },
    { src: 'images/event-11.jpg', category: 'event', label: '행사·컨퍼런스', caption: '컨퍼런스 · 행사 MC' },
    { src: 'images/event-12.jpg', category: 'event', label: '행사·컨퍼런스', caption: '컨퍼런스 · 행사 MC' },

    { src: 'images/content-1.jpg', category: 'content', label: '콘텐츠', caption: '유튜브 콘텐츠 진행' },
    { src: 'images/content-2.jpg', category: 'content', label: '콘텐츠', caption: '유튜브 콘텐츠 진행' },
    { src: 'images/content-3.jpg', category: 'content', label: '콘텐츠', caption: '유튜브 콘텐츠 진행' },
    { src: 'images/content-4.jpg', category: 'content', label: '콘텐츠', caption: '유튜브 콘텐츠 진행' },
    { src: 'images/content-5.jpg', category: 'content', label: '콘텐츠', caption: '유튜브 콘텐츠 진행' },
    { src: 'images/content-6.jpg', category: 'content', label: '콘텐츠', caption: '유튜브 콘텐츠 진행' },

    { src: 'images/model-1.jpg', category: 'model', label: '모델·연기', caption: '뷰티 캠페인 모델' },
    { src: 'images/acting-1.jpg', category: 'model', label: '모델·연기', caption: '드라마 출연 · 뉴스 앵커 역' },
  ];

  const galleryGrid = document.getElementById('galleryGrid');

  galleryItems.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'gallery-item';
    el.dataset.category = item.category;
    el.style.animationDelay = `${(index % 8) * 0.05}s`;
    el.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <div class="gallery-item-overlay"><span>${item.label}</span></div>
    `;
    el.addEventListener('click', () => openLightbox(index));
    galleryGrid.appendChild(el);
  });

  /* ---------- Filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryEls = () => Array.from(galleryGrid.children);

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryEls().forEach((el, i) => {
        const match = filter === 'all' || galleryItems[i].category === filter;
        el.classList.toggle('hide', !match);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  let currentIndex = 0;

  function visibleIndexes() {
    return galleryItems
      .map((_, i) => i)
      .filter((i) => !galleryEls()[i].classList.contains('hide'));
  }

  function updateLightbox() {
    const item = galleryItems[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption;
    lightboxCaption.textContent = `${item.label} · ${item.caption}`;
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  }

  function step(direction) {
    const visible = visibleIndexes();
    const pos = visible.indexOf(currentIndex);
    const next = (pos + direction + visible.length) % visible.length;
    currentIndex = visible[next];
    updateLightbox();
  }

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', () => step(-1));
  document.getElementById('lightboxNext').addEventListener('click', () => step(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
});

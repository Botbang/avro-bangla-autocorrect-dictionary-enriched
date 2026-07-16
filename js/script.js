(() => {
  const DHAKA_TIME_ZONE = 'Asia/Dhaka';
  const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const header = document.querySelector('[data-header]');
  const progress = document.querySelector('[data-scroll-progress]');
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const toBanglaNumber = (value) => String(value).replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)]);

  const updateScrollState = () => {
    const top = window.scrollY;
    const available = document.documentElement.scrollHeight - window.innerHeight;
    header?.classList.toggle('is-scrolled', top > 24);
    if (progress) progress.style.width = `${available > 0 ? Math.min(100, (top / available) * 100) : 0}%`;
  };

  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
  };

  menuButton?.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    nav?.classList.toggle('is-open', opening);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
  });

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((node) => node.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    reveals.forEach((node) => revealObserver.observe(node));
  }

  document.querySelectorAll('[data-target]').forEach((counter) => {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    const target = Number(counter.dataset.target);
    const counterObserver = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;
      const started = performance.now();
      const duration = 1100;
      const animate = (now) => {
        const progressValue = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - progressValue, 3);
        counter.textContent = Math.round(target * eased).toLocaleString('en-US');
        if (progressValue < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.8 });
    counterObserver.observe(counter);
  });

  const dhakaParts = (date) => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: DHAKA_TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(date);
    return Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
  };

  const banglaCalendarDate = (year, month, day) => {
    const target = Date.UTC(year, month - 1, day);
    const earlyYear = year - 594;
    const lateYear = year - 593;
    const starts = [
      [Date.UTC(year - 1, 11, 16), 'পৌষ', 8, earlyYear],
      [Date.UTC(year, 0, 15), 'মাঘ', 9, earlyYear],
      [Date.UTC(year, 1, 14), 'ফাল্গুন', 10, earlyYear],
      [Date.UTC(year, 2, 15), 'চৈত্র', 11, earlyYear],
      [Date.UTC(year, 3, 14), 'বৈশাখ', 0, lateYear],
      [Date.UTC(year, 4, 15), 'জ্যৈষ্ঠ', 1, lateYear],
      [Date.UTC(year, 5, 15), 'আষাঢ়', 2, lateYear],
      [Date.UTC(year, 6, 16), 'শ্রাবণ', 3, lateYear],
      [Date.UTC(year, 7, 16), 'ভাদ্র', 4, lateYear],
      [Date.UTC(year, 8, 16), 'আশ্বিন', 5, lateYear],
      [Date.UTC(year, 9, 17), 'কার্তিক', 6, lateYear],
      [Date.UTC(year, 10, 16), 'অগ্রহায়ণ', 7, lateYear],
      [Date.UTC(year, 11, 16), 'পৌষ', 8, lateYear]
    ];
    const active = starts.filter(([start]) => start <= target).at(-1);
    const [start, monthName, monthIndex, banglaYear] = active;
    const banglaDay = Math.floor((target - start) / 86400000) + 1;
    const seasons = [
      { name: 'গ্রীষ্ম', key: 'grishmo', symbol: '☀' },
      { name: 'বর্ষা', key: 'borsha', symbol: '☂' },
      { name: 'শরৎ', key: 'shorot', symbol: '☁' },
      { name: 'হেমন্ত', key: 'hemonto', symbol: '❋' },
      { name: 'শীত', key: 'sheet', symbol: '❄' },
      { name: 'বসন্ত', key: 'boshonto', symbol: '✿' }
    ];
    return { day: banglaDay, month: monthName, year: banglaYear, season: seasons[Math.floor(monthIndex / 2)] };
  };

  const dayPeriod = (hour) => {
    if (hour >= 4 && hour < 6) return 'ভোর';
    if (hour >= 6 && hour < 12) return 'সকাল';
    if (hour >= 12 && hour < 15) return 'দুপুর';
    if (hour >= 15 && hour < 18) return 'বিকেল';
    if (hour >= 18 && hour < 20) return 'সন্ধ্যা';
    return 'রাত';
  };

  let lastDhakaDate = '';
  const updateDhakaClock = () => {
    const now = new Date();
    const parts = dhakaParts(now);
    const hour = Number(parts.hour);
    const hourTwelve = hour % 12 || 12;
    const clock = document.querySelector('[data-dhaka-clock]');
    if (clock) {
      clock.textContent = `${dayPeriod(hour)} ${toBanglaNumber(`${hourTwelve}:${parts.minute}:${parts.second}`)}`;
      clock.dateTime = now.toISOString();
    }

    const dateKey = `${parts.year}-${parts.month}-${parts.day}`;
    if (dateKey === lastDhakaDate) return;
    lastDhakaDate = dateKey;

    const year = Number(parts.year);
    const month = Number(parts.month);
    const day = Number(parts.day);
    const bangla = banglaCalendarDate(year, month, day);
    const setText = (selector, value) => {
      const node = document.querySelector(selector);
      if (node) node.textContent = value;
    };

    setText('[data-bangla-day]', toBanglaNumber(bangla.day));
    setText('[data-bangla-month]', bangla.month);
    setText('[data-bangla-year]', toBanglaNumber(bangla.year));
    setText('[data-bangla-season]', bangla.season.name);
    setText('[data-season-symbol]', bangla.season.symbol);
    setText('[data-gregorian-date]', new Intl.DateTimeFormat('bn-BD', {
      timeZone: DHAKA_TIME_ZONE,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(now));
    document.querySelector('[data-today-section]')?.setAttribute('data-season', bangla.season.key);
  };

  const weatherMeta = (code) => {
    if (code === 0) return { label: 'পরিষ্কার আকাশ', type: 'clear' };
    if (code === 1) return { label: 'প্রধানত পরিষ্কার', type: 'clear' };
    if (code === 2) return { label: 'আংশিক মেঘলা', type: 'partly' };
    if (code === 3) return { label: 'মেঘলা আকাশ', type: 'cloudy' };
    if ([45, 48].includes(code)) return { label: 'কুয়াশাচ্ছন্ন', type: 'fog' };
    if ([51, 53, 55, 56, 57].includes(code)) return { label: 'গুঁড়ি গুঁড়ি বৃষ্টি', type: 'drizzle' };
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: code === 65 || code === 82 ? 'ভারী বৃষ্টি' : 'বৃষ্টি', type: 'rain' };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'তুষারপাত', type: 'snow' };
    if ([95, 96, 99].includes(code)) return { label: 'বজ্রসহ বৃষ্টি', type: 'thunder' };
    return { label: 'পরিবর্তনশীল আবহাওয়া', type: 'cloudy' };
  };

  const formatWeatherNumber = (value, digits = 0) => {
    if (!Number.isFinite(Number(value))) return '--';
    const fixed = Number(value).toFixed(digits).replace(/\.0$/, '');
    return toBanglaNumber(fixed);
  };

  const weatherCard = document.querySelector('[data-weather-card]');
  const weatherScene = document.querySelector('[data-weather-scene]');
  const weatherRefresh = document.querySelector('[data-weather-refresh]');
  let weatherController;
  let weatherLoaded = false;
  let lastWeatherLoad = 0;

  const loadWeather = async () => {
    if (!weatherCard || !weatherScene) return;
    weatherController?.abort();
    const requestController = new AbortController();
    weatherController = requestController;
    weatherRefresh?.classList.add('is-loading');
    weatherRefresh?.setAttribute('aria-busy', 'true');

    const params = new URLSearchParams({
      latitude: '23.8103',
      longitude: '90.4125',
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,weather_code,cloud_cover,wind_speed_10m',
      timezone: DHAKA_TIME_ZONE,
      forecast_days: '1'
    });

    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
        signal: requestController.signal,
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);
      const data = await response.json();
      const current = data.current;
      if (!current) throw new Error('Current weather is missing');

      const meta = weatherMeta(Number(current.weather_code));
      const isDay = Number(current.is_day) === 1;
      const setText = (selector, value) => {
        const node = document.querySelector(selector);
        if (node) node.textContent = value;
      };

      weatherCard.dataset.weather = meta.type;
      weatherCard.classList.remove('has-error');
      weatherScene.className = `weather-scene is-${meta.type} ${isDay ? 'is-day' : 'is-night'}`;
      setText('[data-weather-temp]', formatWeatherNumber(current.temperature_2m));
      setText('[data-weather-condition]', meta.label);
      setText('[data-weather-feels]', `${formatWeatherNumber(current.apparent_temperature)}°`);
      setText('[data-weather-humidity]', `${formatWeatherNumber(current.relative_humidity_2m)}%`);
      setText('[data-weather-wind]', `${formatWeatherNumber(current.wind_speed_10m)} কিমি/ঘণ্টা`);
      setText('[data-weather-rain]', `${formatWeatherNumber(current.precipitation, 1)} মিমি`);
      setText('[data-weather-updated]', `আপডেট: ${new Intl.DateTimeFormat('bn-BD', {
        timeZone: DHAKA_TIME_ZONE,
        hour: 'numeric',
        minute: '2-digit'
      }).format(new Date())}`);
      weatherLoaded = true;
      lastWeatherLoad = Date.now();
    } catch (error) {
      if (error.name === 'AbortError') return;
      weatherCard.classList.add('has-error');
      const condition = document.querySelector('[data-weather-condition]');
      const updated = document.querySelector('[data-weather-updated]');
      if (!weatherLoaded && condition) condition.textContent = 'তথ্য পাওয়া যায়নি';
      if (updated) updated.textContent = 'ইন্টারনেট সংযোগ হলে আবার চেষ্টা করুন';
    } finally {
      if (weatherController === requestController) {
        weatherRefresh?.classList.remove('is-loading');
        weatherRefresh?.removeAttribute('aria-busy');
      }
    }
  };

  weatherRefresh?.addEventListener('click', loadWeather);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && Date.now() - lastWeatherLoad > 10 * 60 * 1000) loadWeather();
  });

  updateDhakaClock();
  window.setInterval(updateDhakaClock, 1000);
  loadWeather();
  window.setInterval(loadWeather, 10 * 60 * 1000);
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
})();

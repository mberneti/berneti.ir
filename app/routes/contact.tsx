export default function ContactPage() {
  const socialLinks = [
    { name: 'GitHub', username: '@mberneti', url: 'https://github.com/mberneti', icon: '💻' },
    { name: 'Twitter', username: '@mberneti', url: 'https://twitter.com/mberneti', icon: '🐦' },
    { name: 'LinkedIn', username: '@mberneti', url: 'https://linkedin.com/in/mberneti', icon: '💼' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-black tracking-wide mb-3 bg-gradient-to-l from-accent to-primary bg-clip-text text-transparent">
          تماس با من
        </h1>
        <p className="text-secondary text-sm">
          خوشحال می‌شم باهام در ارتباط باشید
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Card */}
        <div className="group relative border border-subText/20 rounded-xl p-8 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 bg-gradient-to-br from-background to-background/50">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/0 to-primary/0 group-hover:from-accent/5 group-hover:to-primary/5 transition-all duration-300"></div>

          <div className="relative">
            {/* Icon */}
            <div className="w-16 h-16 mb-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
              <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Content */}
            <h3 className="text-xl font-black text-accent mb-3 group-hover:text-primary transition-colors duration-300">
              ایمیل
            </h3>
            <div className="h-[2px] w-12 mb-4 bg-gradient-to-l from-accent/50 to-transparent group-hover:w-20 transition-all duration-300"></div>

            <a
              href="mailto:mberneti@live.com"
              className="text-text/90 hover:text-accent transition-colors duration-200 block mb-2"
              dir="ltr"
            >
              mberneti@live.com
            </a>
            <p className="text-sm text-secondary leading-relaxed">
              برای سوالات، پیشنهادات یا همکاری با من در ارتباط باشید.
            </p>
          </div>
        </div>

        {/* Social Media Card */}
        <div className="group relative border border-subText/20 rounded-xl p-8 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-gradient-to-br from-background to-background/50">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-success/0 group-hover:from-primary/5 group-hover:to-success/5 transition-all duration-300"></div>

          <div className="relative">
            {/* Icon */}
            <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>

            {/* Content */}
            <h3 className="text-xl font-black text-primary mb-3 group-hover:text-success transition-colors duration-300">
              شبکه‌های اجتماعی
            </h3>
            <div className="h-[2px] w-12 mb-4 bg-gradient-to-l from-primary/50 to-transparent group-hover:w-20 transition-all duration-300"></div>

            <p className="text-sm text-secondary mb-4">
              در شبکه‌های اجتماعی با
              <span dir="ltr" className="px-1 text-primary font-bold">
                @mberneti
              </span>
              می‌تونید منو پیدا کنید.
            </p>

            {/* Social Links */}
            <div className="space-y-2 mt-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text/80 hover:text-primary transition-all duration-200 py-2 px-3 rounded-lg hover:bg-primary/5 group/link"
                >
                  <span className="text-xl">{social.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-sm">{social.name}</div>
                    <div className="text-xs text-secondary group-hover/link:text-primary transition-colors duration-200" dir="ltr">
                      {social.username}
                    </div>
                  </div>
                  <svg className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Card */}
      <div className="mt-6 border border-subText/20 rounded-xl p-6 bg-gradient-to-r from-success/5 to-accent/5">
        <div className="flex items-start gap-4">
          <div className="text-2xl">💡</div>
          <div className="flex-1">
            <h4 className="font-bold text-success mb-2">نکته</h4>
            <p className="text-sm text-secondary leading-relaxed">
              اگر سوالی درباره محتوای وبلاگ یا موضوعات فنی دارید، خوشحال می‌شم که کمکتون کنم. همچنین برای همکاری‌های حرفه‌ای هم می‌تونید با من در ارتباط باشید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-black tracking-wide mb-3 bg-gradient-to-l from-accent to-primary bg-clip-text text-transparent">
          درباره من
        </h1>
        <p className="text-secondary text-sm">
          برنامه‌نویس، توسعه‌دهنده و یادگیرنده
        </p>
      </header>

      {/* Main Card */}
      <div className="group relative border border-subText/20 rounded-xl overflow-hidden hover:border-accent/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative lg:flex">
          {/* Image Section */}
          <div className="relative lg:w-2/5 min-h-[300px] lg:min-h-[500px] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: "url('/img/berneti2.jpg')",
                backgroundPosition: "center center",
              }}
            ></div>
            {/* Gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent lg:bg-gradient-to-r"></div>
          </div>

          {/* Content Section */}
          <div className="relative lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-2xl lg:text-3xl font-black text-accent group-hover:text-primary transition-colors duration-300">
                برنتی
              </h2>
              <p className="text-lg text-success font-bold">توسعه‌دهنده‌ی وب</p>
              <div className="h-[2px] w-20 bg-gradient-to-l from-accent to-primary"></div>
            </div>

            {/* Description Blocks */}
            <div className="space-y-5 text-text/90">
              <div className="relative pr-4 border-r-2 border-accent/30 hover:border-accent/60 transition-colors duration-300">
                <p className="leading-relaxed">
                  در حال حاضر به عنوان{" "}
                  <span className="text-accent font-bold">
                    چپتر لید فرانت Q-Commerce دیجیکالا
                  </span>{" "}
                  مشغول به کارم.
                </p>
              </div>

              <div className="relative pr-4 border-r-2 border-primary/30 hover:border-primary/60 transition-colors duration-300">
                <p className="leading-relaxed">
                  سال ۱۳۹۱ مهندسی نرم‌افزار دانشگاه مازندران قبول شدم و از اون
                  به بعد برنامه‌نویسی یک قسمت جدا نشدنی از زندگیم شد. اکثر
                  کارهای من در حوزه‌ی وب بوده، حدودا{" "}
                  <span className="text-primary font-bold">
                    ۶ سال اول به عنوان فول‌استک دولوپر
                  </span>{" "}
                  مشغول به کار بودم و بعد از اون به عنوان{" "}
                  <span className="text-primary font-bold">
                    فرانت‌اند دولوپر
                  </span>
                  .
                </p>
              </div>

              <div className="relative pr-4 border-r-2 border-success/30 hover:border-success/60 transition-colors duration-300">
                <p className="leading-relaxed">
                  کارشناسی ارشدم رو در دانشگاه علم و صنعت گذروندم. به خاطر
                  علاقه‌ی زیادم به{" "}
                  <span className="text-success font-bold">
                    هوش مصنوعی و پردازش تصویر
                  </span>
                  ، پایان‌نامه‌ام در حوزه‌ی پردازش تصویر بود.
                </p>
              </div>
            </div>

            {/* Stats or highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-subText/20">
              <div className="text-center">
                <div className="text-2xl font-black text-accent">13+</div>
                <div className="text-xs text-secondary mt-1">سال تجربه</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-primary">∞</div>
                <div className="text-xs text-secondary mt-1">یادگیری مداوم</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-success">AI</div>
                <div className="text-xs text-secondary mt-1">
                  علاقه‌مند به هوش مصنوعی
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

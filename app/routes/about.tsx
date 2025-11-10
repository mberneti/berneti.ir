export default function AboutPage() {
  return (
    <div className="mx-auto flex items-center justify-center pt-4">
      <div className="max-w-[450px] lg:max-w-none lg:flex shadow-2xl shadow-black bg-black rounded">
        <div
          className="min-h-[250px] lg:min-h-0 lg:h-auto lg:w-1/3 flex-none bg-cover rounded-tr rounded-tl lg:rounded-tl-none lg:rounded-r text-center overflow-hidden"
          style={{
            backgroundImage: "url('/img/berneti2.jpg')",
            backgroundPosition: "center center",
          }}
          title="Woman holding a mug"
        ></div>
        <div className="h-auto rounded-b lg:rounded-b-none lg:rounded-l p-4 flex flex-col justify-between leading-normal">
          <div className="font-bold text-xl mb-4">برنتی، توسعه دهنده‌ی وب</div>
          <div className="text-base mb-2 font-body leading-relaxed">
            در حال حاضر به عنوان چپتر لید فرانت Q-Commerce دیجیکالا مشغول به
            کارم.
          </div>
          <div className="font-base mb-2 font-body leading-relaxed">
            سال ۱۳۹۱ مهندسی نرم افزار دانشگاه مازندران قبول شدم و از اون به بعد
            برنامه‌نویسی یک قسمت جدا نشدنی از زندگیم شد. اکثر کارهای من در
            حوزه‌ی وب بوده، حدودا ۶ سال اول به عنوان فول استک دولوپر مشغول به
            کار بودم و بعد از اون به عنوان فرانت اند دولوپر.
          </div>
          <div className="text-base mb-2 font-body leading-relaxed">
            کارشناسی ارشدم رو در دانشگاه علم و صنعت گذروندم به خاطر علاقه‌ی
            زیادم به هوش مصنوعی و پردازش تصویر، پایان نامه‌ام در حوزه‌ی پردازش
            تصویر بود.
          </div>
        </div>
      </div>
    </div>
  );
}

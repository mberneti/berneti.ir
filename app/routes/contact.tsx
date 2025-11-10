export default function ContactPage() {
  return (
    <div className="flex items-center justify-center pt-4">
      <div className="lg:flex shadow-2xl rounded shadow-black">
        <div className="bg-midnightSecondary h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-tl rounded-tr lg:rounded-tl-none lg:rounded-br flex items-center justify-center">
          <img src="/img/mail.svg" className="w-auto h-20" alt="Email" />
        </div>
        <div className="bg-black lg:border-r-0 rounded-b lg:rounded-b-none lg:rounded-l p-4 flex flex-col justify-between leading-normal">
          <div className="mb-2">
            <div className="font-bold text-xl mb-2">
              ایمیل من mberneti [at] live.com
            </div>
            <div className="text-base">
              در شبکه‌های اجتماعی با
              <span dir="ltr" className="px-1">
                @mberneti
              </span>
              می‌تونید منو پیدا کنید.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

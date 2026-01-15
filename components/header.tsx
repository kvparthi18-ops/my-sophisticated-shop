import Image from 'next/image';
import Link from 'next/link';
// ... other imports

export default async function Home() {
  const products = await getStripeProducts();

  return (
    <main className="min-h-screen bg-white">
      {/* ... Announcement Bar ... */}

      <div className="max-w-7xl mx-auto px-6 py-24">
        <header className="mb-24 text-center">
          <WelcomeGreeting />
          
          {/* --- LOGO SECTION START --- */}
          <div className="flex justify-center mb-6">
            <Link href="/">
              <Image 
                src="/zc_logo.png"          // Name of your file in /public
                alt="Zury Collections"
                width={180}              // Desired width
                height={60}              // Desired height
                priority                 // Ensures the logo loads immediately
                className="object-contain"
              />
            </Link>
          </div>
          {/* --- LOGO SECTION END --- */}

          <div className="h-[1px] w-12 bg-black mx-auto mb-6" />
          <p className="text-gray-400 max-w-sm mx-auto uppercase text-[10px] tracking-[0.4em] leading-relaxed">
            Curated Objects <span className="text-black/20 mx-2">/</span> Timeless Design <span className="text-black/20 mx-2">/</span> Studio Essentials
          </p>
        </header>

        {/* ... Product Grid ... */}
      </div>
      {/* ... Footer ... */}
    </main>
  );
}
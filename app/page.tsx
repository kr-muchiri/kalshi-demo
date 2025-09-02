import Widget from "../components/widget";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Kalshi • Breakeven Bar (Demo)</h1>
          <a
            href="https://github.com/YOURUSER/kalshi-demo"
            className="text-sm underline hover:opacity-80"
            target="_blank"
          >
            View Code
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <p className="text-sm text-gray-600">
          Shows implied %, fee-adjusted breakeven, and instant P/L at size for YES/NO.
        </p>

        {/* Example A */}
        <section className="space-y-2">
          <h2 className="text-base font-medium">Example A — “Rate cut by Dec?”</h2>
          <Widget />
        </section>

        {/* Example B */}
        <section className="space-y-2">
          <h2 className="text-base font-medium">Example B — “Team X wins title?”</h2>
          <Widget />
        </section>

        <footer className="pt-4 text-xs text-gray-500">
          Demo math is simplified; production should use Kalshi’s exact fee schedule & rounding rules.
        </footer>
      </div>
    </main>
  );
}

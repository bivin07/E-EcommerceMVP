import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "88vh",
        background: "#ffffff",
      }}
    >
      {/* Background mesh gradient blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 85% 10%, rgba(95,72,198,0.13) 0%, transparent 55%), " +
            "radial-gradient(ellipse at 15% 80%, rgba(136,51,207,0.08) 0%, transparent 45%), " +
            "radial-gradient(ellipse at 50% 50%, rgba(250,106,25,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(95,72,198,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(95,72,198,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content layout — split */}
      <div className="content-container relative z-10 flex flex-col small:flex-row items-center justify-between gap-12 py-20 small:py-0 small:min-h-[88vh]">

        {/* LEFT — Text content */}
        <div className="flex-1 flex flex-col gap-6 max-w-2xl text-center small:text-left">

          {/* Trust badge */}
          <div className="flex justify-center small:justify-start">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
              style={{
                background: "rgba(95,72,198,0.08)",
                border: "1px solid rgba(95,72,198,0.25)",
                color: "#5f48c6",
              }}
            >
              <span style={{ color: "#fa6a19" }}>⚡</span>
              Trusted by 5,000+ Professionals
            </div>
          </div>

          {/* Main heading */}
          <div>
            <h1
              className="leading-[0.95] tracking-tight"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 700,
                fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
                color: "#1a1a2e",
              }}
            >
              Premium{" "}

              <br />
              <span style={{ color: "#1a1a2e" }}>Supplie</span>
              <span style={{ color: "#fa6a19" }}>s</span>
            </h1>
          </div>

          {/* Sub-heading */}
          <p
            className="text-lg leading-relaxed max-w-lg mx-auto small:mx-0"
            style={{ color: "#6b6b8d", fontFamily: "Inter, sans-serif", fontWeight: 400 }}
          >
            Professional-grade components, wiring, panels and tools — built for
            engineers and contractors who demand{" "}
            <em style={{ color: "#5f48c6", fontStyle: "normal", fontWeight: 600 }}>
              quality without compromise
            </em>
            .
          </p>

          {/* CTA group */}
          <div className="flex flex-col xsmall:flex-row items-center small:items-start gap-4">
            {/* Primary CTA */}
            <LocalizedClientLink href="/store">
              <button
                className="relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-sm tracking-wide transition-all duration-300 shadow-[0_6px_28px_rgba(95,72,198,0.4)] hover:shadow-[0_12px_36px_rgba(95,72,198,0.5)] hover:-translate-y-[3px]"
                style={{
                  background: "linear-gradient(135deg, #5f48c6 0%, #8833cf 100%)",
                }}
              >
                <span>Shop All Products</span>
                <span style={{ color: "#fa6a19", fontSize: "1.1em" }}>→</span>
              </button>
            </LocalizedClientLink>

            {/* Ghost CTA */}
            <a href="#collections-list">
              <button
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 border-[1.5px] border-[rgba(95,72,198,0.35)] bg-transparent text-[#5f48c6] hover:bg-[rgba(95,72,198,0.06)] hover:border-[#5f48c6] hover:-translate-y-[2px]"
              >
                Browse Categories
              </button>
            </a>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-8 pt-2 justify-center small:justify-start">
            {[
              { value: "5K+", label: "Professionals" },
              { value: "2K+", label: "Products" },
              { value: "99%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center small:text-left">
                <p
                  className="text-2xl font-bold leading-none"
                  style={{ color: "#5f48c6" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs mt-1" style={{ color: "#6b6b8d" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Abstract visual / illustration */}
        <div className="flex-1 flex items-center justify-center relative max-w-xl w-full">
          {/* Outer glow ring */}
          <div
            className="absolute"
            style={{
              width: "480px",
              height: "480px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(95,72,198,0.1) 0%, transparent 70%)",
            }}
          />

          {/* Main abstract card */}
          <div
            className="relative z-10 rounded-3xl p-8"
            style={{
              width: "min(420px, 90vw)",
              background: "white",
              boxShadow: "0 24px 80px rgba(95,72,198,0.18), 0 8px 32px rgba(0,0,0,0.06)",
              border: "1px solid rgba(95,72,198,0.1)",
            }}
          >
            {/* Card top bar */}
            <div
              className="h-1 w-full rounded-full mb-6"
              style={{ background: "linear-gradient(90deg, #5f48c6, #8833cf, #fa6a19)" }}
            />

            {/* Product showcase placeholder */}
            <div className="text-center py-8">

              <p
                className="text-sm font-semibold uppercase tracking-widest mb-1"
                style={{ color: "#6b6b8d" }}
              >
                Featured
              </p>
              <p
                className="text-2xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #5f48c6, #8833cf)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                Professional Grade
              </p>
              <p className="text-sm mt-2" style={{ color: "#6b6b8d" }}>
                Cables · Panels · Switches · Tools
              </p>
            </div>

            {/* Mini feature pills */}
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {["ISO Certified", "Bulk Orders", "Fast Delivery", "Warranty"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{
                    background: "rgba(95,72,198,0.07)",
                    border: "1px solid rgba(95,72,198,0.15)",
                    color: "#5f48c6",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Shop now mini CTA */}
            <LocalizedClientLink href="/store" className="block mt-6">
              <div
                className="flex items-center justify-between px-5 py-3.5 rounded-xl cursor-pointer transition-all duration-200 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #5f48c6, #8833cf)",
                }}
              >
                <span className="text-white text-sm font-semibold">View All Products</span>
                <span style={{ color: "#fa6a19", fontSize: "1.2em" }}>→</span>
              </div>
            </LocalizedClientLink>
          </div>

          {/* Floating decorative circles */}
          <div
            className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-60"
            style={{
              background: "linear-gradient(135deg, rgba(250,106,25,0.3), rgba(95,72,198,0.1))",
              animation: "float 5s ease-in-out infinite",
            }}
          />
          <div
            className="absolute -bottom-8 -left-4 w-14 h-14 rounded-full opacity-50"
            style={{
              background: "linear-gradient(135deg, rgba(95,72,198,0.3), rgba(136,51,207,0.2))",
              animation: "float 4s ease-in-out infinite 1s",
            }}
          />
        </div>
      </div>

      {/* Bottom wave separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(95,72,198,0.03) 100%)",
        }}
      />
    </section>
  )
}

export default Hero

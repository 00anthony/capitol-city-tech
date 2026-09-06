"use client";

import { useState } from "react";

interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceDetail?: string;
  tagline: string;
  forLabel: string;
  forItems: string[];
  sectionLabel: string;
  features: string[];
  featured?: boolean;
  ctaLabel: string;
}

interface MaintenancePlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  featured?: boolean;
}

const PROJECT_TIERS: PricingTier[] = [
  {
    id: "launch",
    name: "Launch",
    price: "$2,500",
    tagline: "Everything you need to get online and get found.",
    forLabel: "Best for",
    forItems: ["New & small businesses", "Simple service companies"],
    sectionLabel: "Includes",
    features: [
      "5-page website",
      "Contact form",
      "Mobile optimization",
      "Basic SEO setup",
      "Google Analytics",
    ],
    ctaLabel: "Get started",
  },
  {
    id: "growth",
    name: "Growth",
    price: "$5,000",
    tagline: "Conversion-focused design for businesses ready to scale.",
    forLabel: "Best for",
    forItems: ["Established businesses", "Companies already generating revenue"],
    sectionLabel: "Everything in Launch, plus",
    features: [
      "Custom design system",
      "Conversion optimization",
      "Additional pages",
      "Blog / CMS",
      "Growth strategy session",
    ],
    featured: true,
    ctaLabel: "Most popular",
  },
  {
    id: "authority",
    name: "Authority",
    price: "$7,000",
    tagline: "A flagship site built to win premium clients.",
    forLabel: "Best for",
    forItems: ["Premium & high-ticket clients", "Businesses where one client is worth thousands"],
    sectionLabel: "Everything in Growth, plus",
    features: [
      "Full custom design",
      "Advanced SEO architecture",
      "Copywriting assistance",
      "Multiple landing pages",
      "Analytics dashboard",
      "Priority support",
    ],
    ctaLabel: "Get started",
  },
];

const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: "care",
    name: "Care Plan",
    price: "$99/mo",
    features: ["Hosting", "Backups", "Security monitoring"],
  },
  {
    id: "growth-plan",
    name: "Growth Plan",
    price: "$199/mo",
    features: ["Everything in Care", "1 hr edits/month", "Monthly analytics report"],
    featured: true,
  },
  {
    id: "partner",
    name: "Partner Plan",
    price: "$299/mo",
    features: [
      "Everything in Growth",
      "Priority support",
      "Multiple monthly updates",
      "SEO monitoring",
    ],
  },
];

export default function Pricing() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section id="pricing" className="relative w-full py-24 px-4 bg-[#07070d] overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-violet-600/8 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] uppercase text-blue-400/70 font-medium mb-4">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Flexible packages for every stage.
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Pick a focused sprint or an ongoing growth partnership.
          </p>
        </div>

        {/* Project Tier Cards */}
        <div
          className="flex flex-col md:flex-row gap-4 md:gap-0 items-stretch justify-center mb-6"
          onMouseLeave={() => setHoveredTier(null)}
        >
          {PROJECT_TIERS.map((tier) => {
            const isHovered = hoveredTier === tier.id;
            const siblingHovered = hoveredTier !== null && hoveredTier !== tier.id;
            const isFeatured = tier.featured;

            return (
              <div
                key={tier.id}
                onMouseEnter={() => setHoveredTier(tier.id)}
                className="relative flex-1 md:max-w-sm cursor-pointer"
                style={{
                  zIndex: isHovered ? 20 : isFeatured && hoveredTier === null ? 10 : 1,
                  transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease, z-index 0s",
                  transform: isHovered
                    ? "translateY(-16px) scale(1.03)"
                    : isFeatured && hoveredTier === null
                    ? "translateY(-10px) scale(1.01)"
                    : "translateY(0) scale(1)",
                  filter: siblingHovered ? "blur(3px) brightness(0.5)" : "none",
                  marginLeft: "0",
                  marginRight: "0",
                }}
              >
                <div
                  className="h-full rounded-2xl p-6 flex flex-col"
                  style={{
                    background: isFeatured
                      ? "linear-gradient(135deg, rgba(59,125,216,0.18) 0%, rgba(20,20,40,0.95) 60%)"
                      : "rgba(255,255,255,0.035)",
                    border: isFeatured
                      ? "1px solid rgba(59,125,216,0.45)"
                      : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: isFeatured
                      ? "0 0 40px rgba(59,125,216,0.15), inset 0 1px 0 rgba(255,255,255,0.06)"
                      : "inset 0 1px 0 rgba(255,255,255,0.04)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  {/* Top: name + featured badge */}
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-white font-semibold text-lg">{tier.name}</h3>
                    {isFeatured && (
                      <span
                        className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(59,125,216,0.25)",
                          color: "#7eb8f7",
                          border: "1px solid rgba(59,125,216,0.4)",
                        }}
                      >
                        Popular
                      </span>
                    )}
                  </div>

                  <p className="text-slate-400 text-sm mb-5 leading-relaxed">{tier.tagline}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <span
                      className="text-5xl font-bold"
                      style={{
                        color: isFeatured ? "#7eb8f7" : "#ffffff",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {tier.price}
                    </span>
                    <span className="text-slate-500 text-sm ml-2">one-time</span>
                  </div>

                  {/* For */}
                  <div className="mb-4">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-slate-500 font-medium mb-2">
                      {tier.forLabel}
                    </p>
                    <ul className="space-y-1">
                      {tier.forItems.map((item) => (
                        <li key={item} className="text-slate-400 text-sm flex items-start gap-2">
                          <span className="text-slate-600 mt-0.5 shrink-0">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Divider */}
                  <div
                    className="my-4"
                    style={{ height: "1px", background: "rgba(255,255,255,0.07)" }}
                  />

                  {/* Features */}
                  <div className="flex-1">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-slate-500 font-medium mb-3">
                      {tier.sectionLabel}
                    </p>
                    <ul className="space-y-2">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            className="shrink-0 mt-0.5"
                          >
                            <circle
                              cx="7.5"
                              cy="7.5"
                              r="6.5"
                              stroke={isFeatured ? "#3b7dd8" : "rgba(255,255,255,0.2)"}
                              strokeWidth="1"
                            />
                            <path
                              d="M4.5 7.5L6.5 9.5L10.5 5.5"
                              stroke={isFeatured ? "#7eb8f7" : "rgba(255,255,255,0.5)"}
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <button
                    className="mt-6 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
                    style={{
                      background: isFeatured
                        ? "rgba(59,125,216,0.85)"
                        : "rgba(255,255,255,0.06)",
                      color: isFeatured ? "#ffffff" : "rgba(255,255,255,0.7)",
                      border: isFeatured
                        ? "1px solid rgba(59,125,216,0.6)"
                        : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {tier.ctaLabel}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section label */}
        <div className="text-center mb-6 mt-16">
          <p className="text-xs tracking-[0.2em] uppercase text-slate-500 font-medium">
            Ongoing Support
          </p>
          <h3 className="text-2xl font-semibold text-white mt-2">Keep your site healthy &amp; growing.</h3>
          <p className="text-slate-500 text-sm mt-1">Add a care plan to any project tier.</p>
        </div>

        {/* Maintenance Plans */}
        <div
          className="flex flex-col md:flex-row gap-4 items-stretch justify-center"
          onMouseLeave={() => setHoveredPlan(null)}
        >
          {MAINTENANCE_PLANS.map((plan) => {
            const isHovered = hoveredPlan === plan.id;
            const siblingHovered = hoveredPlan !== null && hoveredPlan !== plan.id;
            const isFeatured = plan.featured;

            return (
              <div
                key={plan.id}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                className="relative flex-1 md:max-w-xs cursor-pointer"
                style={{
                  zIndex: isHovered ? 20 : 1,
                  transition:
                    "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease",
                  transform: isHovered ? "translateY(-10px) scale(1.03)" : "translateY(0) scale(1)",
                  filter: siblingHovered ? "blur(2px) brightness(0.5)" : "none",
                }}
              >
                <div
                  className="h-full rounded-2xl p-6 flex flex-col"
                  style={{
                    background: isFeatured
                      ? "linear-gradient(135deg, rgba(59,125,216,0.15) 0%, rgba(20,20,40,0.95) 60%)"
                      : "rgba(255,255,255,0.03)",
                    border: isFeatured
                      ? "1px solid rgba(59,125,216,0.4)"
                      : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: isFeatured
                      ? "0 0 30px rgba(59,125,216,0.1)"
                      : "none",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold text-base">{plan.name}</h4>
                    {isFeatured && (
                      <span
                        className="text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(59,125,216,0.2)",
                          color: "#7eb8f7",
                          border: "1px solid rgba(59,125,216,0.35)",
                        }}
                      >
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="mb-5">
                    <span
                      className="text-3xl font-bold"
                      style={{ color: isFeatured ? "#7eb8f7" : "#ffffff" }}
                    >
                      {plan.price.split("/")[0]}
                    </span>
                    <span className="text-slate-500 text-sm">/mo</span>
                  </div>

                  <ul className="space-y-2 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-slate-400">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="shrink-0 mt-0.5"
                        >
                          <circle
                            cx="7"
                            cy="7"
                            r="6"
                            stroke={isFeatured ? "#3b7dd8" : "rgba(255,255,255,0.18)"}
                            strokeWidth="1"
                          />
                          <path
                            d="M4 7L6 9L10 5"
                            stroke={isFeatured ? "#7eb8f7" : "rgba(255,255,255,0.45)"}
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="mt-5 w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
                    style={{
                      background: isFeatured
                        ? "rgba(59,125,216,0.8)"
                        : "rgba(255,255,255,0.05)",
                      color: isFeatured ? "#ffffff" : "rgba(255,255,255,0.6)",
                      border: isFeatured
                        ? "1px solid rgba(59,125,216,0.5)"
                        : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    Add to project
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-600 text-sm mt-10">
          Not sure which tier fits?{" "}
          <a href="#contact" className="text-blue-400/80 hover:text-blue-400 transition-colors underline underline-offset-2">
            Let's talk
          </a>{" "}
          — we'll figure it out together.
        </p>
      </div>
    </section>
  );
}
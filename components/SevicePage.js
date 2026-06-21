"use client";
import { useState, useEffect, useRef } from "react";
import {
  Code,
  Palette,
  Search,
  TrendingUp,
  Settings,
  Star,
  ArrowRight,
  Check,
  Play,
  Camera,
  Globe,
  Users,
  Target,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Icon mapping for services - using more generic mapping since backend uses SVG paths
const serviceIcons = {
  marketing: BarChart3,
  ads: Target,
  management: Users,
  "google-ads": Search,
  "facebook-pixel": Target,
  b2b: Users,
  instagram: Camera,
  youtube: Play,
  seo: TrendingUp,
  "web-design": Globe,
  "video-editing": Camera,
  // Default fallbacks
  code: Code,
  palette: Palette,
  search: Search,
  trending: TrendingUp,
  settings: Settings,
  star: Star,
};

// Custom hook for intersection observer with mobile-friendly settings
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Use different thresholds for mobile vs desktop
    const mobileThreshold = 0.05; // Lower threshold for mobile
    const desktopThreshold = threshold;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: isMobile ? mobileThreshold : desktopThreshold,
        rootMargin: isMobile ? "50px 0px" : "0px 0px", // Earlier trigger on mobile
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, isMobile]);

  return [ref, isVisible, isMobile];
};

// Function to get icon based on service title or icon path
const getServiceIcon = (service) => {
  const iconPath = service.icon;
  if (iconPath) {
    const iconName = iconPath.split("/").pop().replace(".svg", "");
    return serviceIcons[iconName] || Settings;
  }

  // Fallback based on title keywords
  const title = service.title.toLowerCase();
  if (title.includes("marketing")) return BarChart3;
  if (title.includes("ads") || title.includes("advertising")) return Target;
  if (title.includes("management")) return Users;
  if (title.includes("google")) return Search;
  if (title.includes("facebook")) return Target;
  if (title.includes("b2b")) return Users;
  if (title.includes("instagram")) return Camera;
  if (title.includes("youtube")) return Play;
  if (title.includes("seo")) return TrendingUp;
  if (title.includes("website") || title.includes("web")) return Globe;
  if (title.includes("video")) return Camera;

  return Settings;
};

// Function to generate category based on service title
const getServiceCategory = (service) => {
  const title = service.title.toLowerCase();
  if (title.includes("marketing")) return "Marketing";
  if (
    title.includes("ads") ||
    title.includes("advertising") ||
    title.includes("campaign")
  )
    return "Advertising";
  if (title.includes("management")) return "Management";
  if (title.includes("b2b") || title.includes("lead")) return "Lead Generation";
  if (title.includes("instagram") || title.includes("social"))
    return "Social Media";
  if (title.includes("seo")) return "SEO";
  if (title.includes("website") || title.includes("web"))
    return "Web Development";
  if (title.includes("video")) return "Creative";
  return "Digital Services";
};

// Function to generate features based on service type
const getServiceFeatures = (service) => {
  const title = service.title.toLowerCase();

  if (title.includes("digital marketing")) {
    return [
      "Multi-platform strategy development",
      "Performance tracking and analytics",
      "ROI optimization",
      "Conversion rate improvement",
    ];
  }
  if (title.includes("social media advertising")) {
    return [
      "Targeted audience research",
      "Creative ad design",
      "Campaign optimization",
      "Performance reporting",
    ];
  }
  if (title.includes("social media management")) {
    return [
      "Content calendar planning",
      "Daily posting and scheduling",
      "Community engagement",
      "Brand voice consistency",
    ];
  }
  if (title.includes("google ads")) {
    return [
      "Keyword research and optimization",
      "Ad copy creation",
      "Landing page optimization",
      "Conversion tracking",
    ];
  }
  if (title.includes("facebook campaign")) {
    return [
      "Facebook Pixel implementation",
      "Conversion API setup",
      "Advanced audience targeting",
      "ROI tracking and optimization",
    ];
  }
  if (title.includes("b2b lead")) {
    return [
      "LinkedIn prospecting",
      "Email outreach campaigns",
      "Lead qualification process",
      "CRM integration",
    ];
  }
  if (title.includes("instagram")) {
    return [
      "Hashtag strategy optimization",
      "Content planning and creation",
      "Engagement boost techniques",
      "Follower growth tracking",
    ];
  }
  if (title.includes("youtube")) {
    return [
      "Video keyword optimization",
      "Thumbnail design and testing",
      "Channel optimization",
      "Analytics and reporting",
    ];
  }
  if (title.includes("website seo")) {
    return [
      "Keyword research and analysis",
      "On-page optimization",
      "Technical SEO audit",
      "Link building strategies",
    ];
  }
  if (title.includes("website creation")) {
    return [
      "Responsive design",
      "SEO optimization",
      "Performance optimization",
      "Cross-browser compatibility",
    ];
  }
  if (title.includes("video editing")) {
    return [
      "Professional video editing",
      "Color correction and grading",
      "Motion graphics and effects",
      "Multi-format delivery",
    ];
  }

  return [
    "Professional service delivery",
    "Dedicated account management",
    "Regular progress reports",
    "Quality assurance",
  ];
};

// Animated Service Card Component with mobile fixes
const AnimatedServiceCard = ({ service, index }) => {
  const [ref, isVisible, isMobile] = useIntersectionObserver(0.1);
  const IconComponent = getServiceIcon(service);
  const category = getServiceCategory(service);
  const features = getServiceFeatures(service);

  // Reduce animation complexity on mobile
  const animationDelay = isMobile ? Math.min(index * 100, 300) : index * 150;
  const baseClasses =
    "card bg-base-100 shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden group";

  // Simplified mobile animations
  const mobileAnimationClasses = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-4";

  const desktopAnimationClasses = isVisible
    ? "opacity-100 translate-y-0 scale-100"
    : "opacity-0 translate-y-12 scale-95";

  return (
    <div
      ref={ref}
      className={`${baseClasses} transform duration-700 ${
        isMobile ? mobileAnimationClasses : desktopAnimationClasses
      }`}
      style={{
        transitionDelay: `${animationDelay}ms`,
        // Ensure visibility on mobile even if animation fails
        opacity: isMobile && !isVisible ? 0.8 : undefined,
      }}
    >
      {/* Service Image with Overlay Effect */}
      {service.image && (
        <figure className="h-48 overflow-hidden relative group">
          <div className="w-full h-full relative">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
              quality={65}
              priority={false}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </figure>
      )}

      <div className="card-body relative">
        {/* Floating Icon with reduced mobile animation */}
        <div
          className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mb-4 transition-all duration-300 ${
            isMobile
              ? "group-hover:scale-105"
              : "group-hover:scale-110 group-hover:rotate-12"
          }`}
        >
          <IconComponent
            className="text-primary transition-all duration-300 group-hover:scale-110"
            size={32}
          />
        </div>

        {/* Animated Category Badge */}
        <div className="badge badge-primary badge-outline mb-2 transform transition-all duration-300 group-hover:scale-105 group-hover:badge-primary group-hover:text-white">
          {category}
        </div>

        {/* Service Title */}
        <h3 className="card-title text-xl mb-2 transition-all duration-300 group-hover:text-primary">
          {service.title}
        </h3>

        {/* Service Description */}
        <p className="text-base-content/70 mb-4 line-clamp-3 transition-colors duration-300 group-hover:text-base-content/90">
          {service.description}
        </p>

        {/* Features List with simplified mobile animations */}
        <div className="mb-4">
          <h4 className="font-medium mb-2 transition-colors duration-300 group-hover:text-primary">
            Key Features:
          </h4>
          <ul className="space-y-1">
            {features.slice(0, 3).map((feature, featureIndex) => (
              <li
                key={featureIndex}
                className={`flex items-center text-sm text-base-content/70 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : isMobile
                    ? "opacity-70 translate-x-0" // Fallback for mobile
                    : "opacity-0 -translate-x-4"
                }`}
                style={{
                  transitionDelay: isMobile
                    ? `${animationDelay + 100}ms`
                    : `${animationDelay + featureIndex * 100 + 200}ms`,
                }}
              >
                <Check
                  size={16}
                  className="text-success mr-2 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:text-primary"
                />
                <span className="transition-colors duration-300 group-hover:text-base-content">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button with reduced mobile animation */}
        <div className="card-actions justify-center">
          <Link href={"/contact"}>
            <button
              className={`btn btn-primary w-full group-hover:btn-accent transition-all duration-300 transform group-hover:shadow-lg overflow-hidden relative ${
                isMobile ? "group-hover:scale-102" : "group-hover:scale-105"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center">
                Learn More
                <ArrowRight
                  size={16}
                  className="ml-1 transition-all duration-300 group-hover:translate-x-1"
                />
              </span>
              {/* Button hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
        </div>

        {/* Reduced background pattern effect on mobile */}
        <div
          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full transform translate-x-16 -translate-y-16 transition-all duration-700 ${
            isMobile
              ? "group-hover:scale-125 group-hover:opacity-30"
              : "group-hover:scale-150 group-hover:opacity-50"
          }`}
        ></div>
      </div>
    </div>
  );
};

// Animated Section Component with mobile optimization
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, isVisible, isMobile] = useIntersectionObserver(0.1);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : isMobile
          ? "opacity-90 translate-y-2"
          : "opacity-0 translate-y-8"
      } ${className}`}
      style={{
        transitionDelay: isMobile ? `${Math.min(delay, 200)}ms` : `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Animated Why Choose Us Card with mobile fixes
const AnimatedFeatureCard = ({ icon: Icon, title, description, index }) => {
  const [ref, isVisible, isMobile] = useIntersectionObserver(0.1);

  const animationDelay = isMobile ? Math.min(index * 150, 300) : index * 200;

  return (
    <div
      ref={ref}
      className={`text-center group cursor-pointer transition-all duration-700 transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : isMobile
          ? "opacity-80 translate-y-2 scale-100" // Fallback for mobile
          : "opacity-0 translate-y-8 scale-95"
      }`}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      <div
        className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto mb-4 transition-all duration-500 group-hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-primary/30 group-hover:to-secondary/20 ${
          isMobile
            ? "group-hover:scale-110"
            : "group-hover:scale-125 group-hover:rotate-12"
        }`}
      >
        <Icon
          className="text-primary transition-all duration-300 group-hover:scale-110"
          size={32}
        />
      </div>
      <h3 className="text-xl font-bold mb-2 transition-all duration-300 group-hover:text-primary group-hover:scale-105">
        {title}
      </h3>
      <p className="text-base-content/70 transition-all duration-300 group-hover:text-base-content/90">
        {description}
      </p>
    </div>
  );
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/data/services.json");

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.warn("Using fallback services data due to error:", error.message);

      // Fallback data
      const fallbackServices = [
        {
          id: "1",
          title: "Digital Marketing",
          description:
            "Comprehensive digital marketing strategies that drive traffic, engagement, and conversions across all major platforms.",
          icon: "/icons/services/marketing.svg",
          image: "/images/servicesImage/digital.jpg",
        },
        {
          id: "2",
          title: "Social Media Advertising",
          description:
            "Reach your ideal audience with powerful ad strategies across Facebook, Instagram, and LinkedIn.",
          icon: "/icons/services/ads.svg",
          image: "/images/servicesImage/social.webp",
        },
        {
          id: "3",
          title: "Social Media Management",
          description:
            "We manage your entire social presence with content creation, scheduling, and audience engagement.",
          icon: "/icons/services/management.svg",
          image: "/images/servicesImage/management.jpg",
        },
        {
          id: "4",
          title: "Google Ads (Search, Display & YouTube)",
          description:
            "Launch high-converting Google Ads campaigns to drive traffic and leads with certified experts.",
          icon: "/icons/services/google-ads.svg",
          image: "/images/servicesImage/google-ads.jpg",
        },
        {
          id: "5",
          title: "Facebook Campaign with Pixel & Conversion API",
          description:
            "Data-driven Facebook ad campaigns with complete Pixel and Conversion API setup for tracking and ROI.",
          icon: "/icons/services/facebook-pixel.svg",
          image: "/images/servicesImage/facebook.jpg",
        },
        {
          id: "6",
          title: "B2B Lead Generation",
          description:
            "Get verified, high-quality B2B leads via LinkedIn, Google, and personalized email outreach strategies.",
          icon: "/icons/services/b2b.svg",
          image: "/images/servicesImage/b2b.jpg",
        },
        {
          id: "7",
          title: "Instagram Organic Growth",
          description:
            "Grow your Instagram with real followers and engagement using authentic, organic growth methods.",
          icon: "/icons/services/instagram.svg",
          image: "/images/servicesImage/insta.jpg",
        },
        {
          id: "8",
          title: "YouTube SEO & Organic Video Promotion",
          description:
            "Rank your videos on YouTube search and boost organic views through proven SEO techniques.",
          icon: "/icons/services/youtube.svg",
          image: "/images/servicesImage/youtube.jpg",
        },
        {
          id: "9",
          title: "Website SEO (Search Engine Optimization)",
          description:
            "Boost your website's visibility with keyword research, on-page & technical SEO, and backlinks.",
          icon: "/icons/services/seo.svg",
          image: "/images/servicesImage/web-seo.jpg",
        },
        {
          id: "10",
          title: "Website Creation & Design",
          description:
            "Modern, responsive, SEO-friendly websites built to convert — from portfolios to full e-commerce sites.",
          icon: "/icons/services/web-design.svg",
          image: "/images/servicesImage/web.jpg",
        },
        {
          id: "11",
          title: "Video Editing",
          description:
            "Professional video editing for social media, YouTube, and marketing campaigns that stand out.",
          icon: "/icons/services/video-editing.svg",
          image: "/images/servicesImage/video.webp",
        },
      ];

      setServices(fallbackServices);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary animate-pulse"></div>
          <p className="mt-4 text-base-content/70 animate-fade-in">
            Loading services...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="alert alert-error max-w-md mx-auto transform transition-all duration-500 hover:scale-105">
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-gray-950 overflow-x-hidden">
      {/* Modified Hero Section */}
      <section
        className="relative bg-primary text-primary-content min-h-[600px] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: "url('/images/servicesImage/banner4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white animate-fade-in-up">
            Our Services
          </h1>
          <p
            className="text-lg md:text-xl text-white max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Comprehensive digital solutions to help your business grow and
            succeed in the modern world
          </p>
        </div>

        {/* Keep wave effect if needed */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-base-100 to-transparent"></div>
      </section>

      {/* Services Section */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          {/* Services Grid with better mobile spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <AnimatedServiceCard
                key={`${service.id}-${idx}`}
                service={service}
                index={idx}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section with Gradient Animation */}
      <AnimatedSection className="bg-gradient-to-br from-base-200 via-base-200 to-base-300 py-16 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-all duration-500 hover:scale-105">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
            Lets discuss your project and find the perfect solution for your
            business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn btn-primary btn-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl hover:btn-accent group overflow-hidden relative"
            >
              <span className="relative z-10">Contact Us Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-all duration-500 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent">
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              We deliver exceptional results through our proven approach and
              dedicated expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <AnimatedFeatureCard
              icon={Star}
              title="Quality Assured"
              description="We maintain the highest standards in all our deliverables."
              index={0}
            />
            <AnimatedFeatureCard
              icon={TrendingUp}
              title="Proven Results"
              description="Track record of successful projects and satisfied clients."
              index={1}
            />
            <AnimatedFeatureCard
              icon={Settings}
              title="Custom Solutions"
              description="Tailored approaches to meet your unique business requirements."
              index={2}
            />
            <AnimatedFeatureCard
              icon={ArrowRight}
              title="Fast Delivery"
              description="Efficient processes to deliver your projects on time."
              index={3}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Enhanced CSS for better mobile performance */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          .group-hover\:scale-102:hover {
            transform: scale(1.02);
          }

          /* Reduce animation complexity on mobile */
          .card {
            will-change: opacity, transform;
          }

          /* Ensure cards are visible even with failed animations */
          .card {
            min-height: auto;
            opacity: 1;
          }

          /* Fallback visibility for mobile */
          @supports not (transform: translateY(0)) {
            .card {
              opacity: 1 !important;
              transform: none !important;
            }
          }
        }

        /* Performance optimizations */
        .card {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}

"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Menu, X, Phone, ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import AppLogo from "@/assets/sidebarLogo.svg"
import { useGetServicesQuery } from "@/app/api/serviceApiSlice"
import { selectCurrentUser } from "../../features/auth/authSlice"
import { useSelector, useDispatch } from "react-redux"
import VerifyMyKyc from "@/assets/logo.png"
import { logOut } from "@/features/auth/authSlice"

// Static navigation items
const staticNavItems = [
  {
    name: "Products",
    hasDropdown: true,
    isProducts: true,
  },
  {
    name: "Pricing",
    hasDropdown: false,
    href: "/pricing",
    items: [],
  },
  {
    name: "Resources",
    hasDropdown: true,
    items: [
      { name: "Case Studies", href: "/case-study", description: "Customer success stories" },
      { name: "Blog", "href": "/blog", description: "Industry insights and updates" },
    ],
  },
  {
    name: "Company",
    hasDropdown: true,
    items: [
      { name: "About Us", href: "/about-us", description: "Our mission and team" },
      { name: "Contact", href: "/contact-us", description: "Get in touch with us" },
    ],
  },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [processedProducts, setProcessedProducts] = useState(null)
  const [navigationItems, setNavigationItems] = useState(staticNavItems)
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null)
  const [submenuOffset, setSubmenuOffset] = useState(0)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [activeMobileSubDropdown, setActiveMobileSubDropdown] = useState(null);

  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const categoryRefs = useRef({})
  const leftPaneRef = useRef(null)
  const dropdownTimeoutRef = useRef(null);

  const navigate = useNavigate()
  const { data: servicesData } = useGetServicesQuery()

  // Effect to process and set dynamic services data
  useEffect(() => {
    if (servicesData && Array.isArray(servicesData.data)) {
      let groupedServices = servicesData.data.reduce((acc, service) => {
        if (service.category && typeof service.category === "string" && service.category.trim()) {
          const category = service.category.trim();
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(service);
        }
        return acc;
      }, {});

      // Renaming categories as per business logic
      if (groupedServices["PAN"]) {
        groupedServices["PAN verification"] = groupedServices["PAN"];
        delete groupedServices["PAN"];
      }
      if (groupedServices["CIN"]) {
        groupedServices["CIN verification"] = groupedServices["CIN"];
        delete groupedServices["CIN"];
      }

      // Reordering categories for display
      const reordered = {};
      Object.keys(groupedServices).forEach((key) => {
        if (key !== "PAN verification" && key !== "CIN verification") {
          reordered[key] = groupedServices[key];
        }
      });
      if (groupedServices["PAN verification"]) {
        reordered["PAN verification"] = groupedServices["PAN verification"];
      }
      if (groupedServices["CIN verification"]) {
        reordered["CIN verification"] = groupedServices["CIN verification"];
      }

      // Adding static services to a category
      if (reordered["Identity Verification"]) {
        reordered["Identity Verification"].push(
          { _id: "static-pan", name: "PAN Card Verification" },
          { _id: "static-aadhar", name: "Aadhar Verification" }
        );
      }

      setProcessedProducts(reordered);

      // Add "Products" item to the navigation if not present
      const dynamicProductItem = {
        name: "Products",
        hasDropdown: true,
      };

      if (!navigationItems.find((item) => item.name === "Products")) {
        setNavigationItems([dynamicProductItem, ...staticNavItems]);
      }
    }
  }, [servicesData, navigationItems]);

  // Effect to handle header scroll behavior
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to toggle the mobile menu and manage body overflow
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  // Function to handle navigation and close menus
  const handleNavigation = (href) => {
    if (href) navigate(href);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  // Desktop dropdown menu handlers
  const handleDropdownEnter = (dropdownName) => {
    clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(dropdownName);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  };

  // Desktop product dropdown handlers
  const handleProductsMouseEnter = () => {
    handleDropdownEnter("Products");
    setHoveredCategory(null);
  };

  const handleProductsMouseLeave = () => {
    handleDropdownLeave();
    setHoveredCategory(null);
  };

  // Handler for hovering over a product category
  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
    const categoryElement = categoryRefs.current[category];
    const leftPaneElement = leftPaneRef.current;

    if (categoryElement && leftPaneElement) {
      const categoryRect = categoryElement.getBoundingClientRect();
      const leftPaneRect = leftPaneElement.getBoundingClientRect();
      const offset = categoryRect.top - leftPaneRect.top;
      setSubmenuOffset(offset);
    }
  };

  // Logout function
  const handleLogout = () => {
    dispatch(logOut())
    navigate("/login")
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  }

  // Navigate to user account based on role
  const navigateToUserAccount = () => {
    if (user) {
      if (user.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      navigate("/signup");
    }
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-white/98 backdrop-blur-2xl shadow-xl border-b border-gray-200/60"
            : "bg-gradient-to-r from-[#75e6da] to-[#75e6da] border-b border-[#189ab4]/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
          {/* Logo with Company Name & Slogan */}
<div
  className="flex items-center gap-4 cursor-pointer transition-transform duration-300 hover:scale-105"
  onClick={() => navigate("/")}
>
  {/* Logo Image */}
  <img
    src={VerifyMyKyc || AppLogo || "/placeholder.svg"}
    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
    alt="App Logo"
  />

  {/* Company Name & Slogan */}
  <div className="flex flex-col">
    <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
      <span className="text-green-600">Verify</span>{" "}
      <span className="text-blue-600">E-</span>
      <span className="text-orange-500">KYC</span>
    </h1>
    <p className="text-xs sm:text-sm md:text-base font-medium text-gray-600">
      Trusted Verification <span className="text-blue-600">For A</span>{" "}
      <span className="text-orange-500">Digital World</span>
    </p>
  </div>
</div>


            {/* Desktop Navigation */}
            <nav className="hidden lg:flex">
              <ul className="flex items-center space-x-2 relative">
                {navigationItems.map((item) => (
                  <li
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item.name)}
                    onMouseLeave={() => handleDropdownLeave()}
                  >
                    {item.name === "Products" && processedProducts ? (
                      <div className="relative">
                        <div
                          className={`relative px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 ease-out flex items-center gap-2 cursor-pointer group ${
                            activeDropdown === item.name
                              ? "bg-white/95 text-[#1987BF] shadow-lg scale-105"
                              : isScrolled
                                ? "text-slate-700 hover:text-[#1987BF] hover:bg-white/80"
                                : "text-slate-700 hover:text-[#1987BF] hover:bg-white/20"
                          } ${isScrolled ? "hover:shadow-md" : ""}`}
                        >
                          <span className="font-medium tracking-wide">{item.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-all duration-300 ease-out ${
                              activeDropdown === item.name ? "rotate-180 text-[#1987BF]" : "text-current"
                            }`}
                          />
                        </div>
                        {activeDropdown === item.name && (
                            <div
                                className="absolute top-full left-0 mt-2 bg-white/98 shadow-2xl rounded-2xl border z-50 flex"
                                onMouseEnter={() => clearTimeout(dropdownTimeoutRef.current)}
                                onMouseLeave={() => handleDropdownLeave()}
                            >
                                <div ref={leftPaneRef} className="w-64 p-6 bg-gradient-to-b from-slate-50/50 to-white border-r border-gray-200/30">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">Categories</h3>
                                    <div className="space-y-1">
                                        {Object.keys(processedProducts).map((category) => (
                                            <div key={category}>
                                                <button
                                                    onMouseEnter={() => handleCategoryHover(category)}
                                                    ref={(el) => (categoryRefs.current[category] = el)}
                                                    className="flex items-center justify-between w-full text-left font-medium text-lg text-slate-700 hover:text-[#1987BF] transition-colors duration-200 py-3 px-3 rounded-lg hover:bg-slate-50/50"
                                                >
                                                    <span className="tracking-wide">{category}</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {hoveredCategory && processedProducts[hoveredCategory] && (
                                    <div
                                        className="min-w-72 p-6 absolute left-full bg-white/98 backdrop-blur-xl shadow-xl rounded-l-2xl border-r border-gray-200/30 transition-all duration-300 ease-out animate-in slide-in-from-left-1"
                                        style={{ top: `${submenuOffset}px` }}
                                    >
                                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">{hoveredCategory}</h4>
                                        <div className="space-y-2">
                                            {processedProducts[hoveredCategory].map((service) => (
                                                service._id === "static-pan" || service._id === "static-aadhar" ? (
                                                    <div
                                                        key={service._id}
                                                        className="p-3 rounded-xl bg-slate-50/50 border border-slate-200/50 text-slate-400 cursor-not-allowed"
                                                    >
                                                        <div className="font-medium text-sm">
                                                            {service.name}
                                                        </div>
                                                        <div className="text-xs text-slate-400 mt-1">Coming Soon</div>
                                                    </div>
                                                ) : (
                                                    <a
                                                        key={service._id}
                                                        href={`/product/${service._id}`}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            handleNavigation(`/product/${service._id}`)
                                                        }}
                                                        className="block p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#1987BF]/5 hover:to-blue-50/50 transition-all duration-200 ease-out group cursor-pointer border border-transparent hover:border-[#1987BF]/20 hover:shadow-sm"
                                                    >
                                                        <div className="font-medium text-slate-800 group-hover:text-[#1987BF] transition-colors duration-200 text-sm">
                                                            {service.name}
                                                        </div>
                                                        <div className="text-xs text-slate-500 group-hover:text-[#1987BF]/70 transition-colors duration-200 mt-1">
                                                            Verify instantly
                                                        </div>
                                                    </a>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                      </div>
                    ) : item.hasDropdown ? (
                      <div className="relative">
                        <div
                          className={`relative px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 ease-out flex items-center gap-2 cursor-pointer group ${
                            activeDropdown === item.name
                              ? "bg-white/95 text-[#1987BF] shadow-lg scale-105"
                              : isScrolled
                                ? "text-slate-700 hover:text-[#1987BF] hover:bg-white/80"
                                : "text-slate-700 hover:text-[#1987BF] hover:bg-white/20"
                          } ${isScrolled ? "hover:shadow-md" : ""}`}
                        >
                          <span className="font-medium tracking-wide">{item.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-all duration-300 ease-out ${
                              activeDropdown === item.name ? "rotate-180 text-[#1987BF]" : "text-current"
                            }`}
                          />
                        </div>
                        {activeDropdown === item.name && (
                          <div className="absolute top-full left-0 mt-2 min-w-64 bg-white/98 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-200/50 py-4 px-4 z-50 transition-all duration-300 ease-out transform animate-in slide-in-from-top-1">
                            <div className="space-y-1">
                              {item.items?.map((subItem) => (
                                <a
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    handleNavigation(subItem.href)
                                  }}
                                  className="block p-4 rounded-xl hover:bg-gradient-to-r hover:from-[#1987BF]/5 hover:to-blue-50/50 transition-all duration-200 ease-out group cursor-pointer border border-transparent hover:border-[#1987BF]/20 hover:shadow-sm"
                                >
                                  <div className="font-medium text-slate-800 group-hover:text-[#1987BF] transition-colors duration-200 text-sm">
                                    {subItem.name}
                                  </div>
                                  <div className="text-xs text-slate-500 group-hover:text-[#1987BF]/70 transition-colors duration-200 mt-1">
                                    {subItem.description}
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          navigate(item.href)
                        }}
                        className={`relative px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 ease-out ${
                          isScrolled
                            ? "text-slate-700 hover:text-[#1987BF] hover:bg-white/80 hover:shadow-md"
                            : "text-slate-700 hover:text-[#1987BF] hover:bg-white/20"
                        }`}
                      >
                        <span className="tracking-wide">{item.name}</span>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center">
              {user ? (
                <div
                  className="hidden lg:block relative"
                  onMouseEnter={() => setIsAccountMenuOpen(true)}
                  onMouseLeave={() => setIsAccountMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="flex items-center text-slate-700 hover:text-[#1987BF] border-2 border-slate-200 hover:border-[#1987BF]/30 rounded-xl font-semibold px-5 py-2.5 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105"
                  >
                    <User className="w-5 h-5 mr-2 text-slate-600" />
                    <span className="font-medium tracking-wide">Account</span>
                    <ChevronDown
                      className={`w-4 h-4 ml-1 transition-transform duration-300 ${isAccountMenuOpen ? "rotate-180" : ""}`}
                    />
                  </Button>

                  {isAccountMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white/98 backdrop-blur-xl border-2 border-gray-200/50 shadow-2xl rounded-xl z-50 overflow-hidden transition-all duration-300 ease-out transform animate-in slide-in-from-top-1">
                      <button
                        onClick={() => {
                          if (user.role === "admin") {
                            navigate("/admin");
                          } else {
                            navigate("/user");
                          }
                          setIsAccountMenuOpen(false);
                        }}
                        className="block w-full text-left px-5 py-4 text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-[#1987BF]/5 hover:to-blue-50/50 hover:text-[#1987BF] transition-all duration-200"
                      >
                        Go to Account
                      </button>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsAccountMenuOpen(false);
                        }}
                        className="block w-full text-left px-5 py-4 text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-50/50 hover:text-red-600 transition-all duration-200"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden lg:block">
                  <Button
                    className="bg-gray-900 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3 text-base border-0"
                    type="button"
                    onClick={() => navigate("/signup")}
                  >
                    <span className="font-medium tracking-wide">Get Started</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Button>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden h-12 w-12 p-0 hover:bg-white/20 rounded-xl transition-all duration-200"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-slate-600" />
                ) : (
                  <Menu size={24} className="text-slate-600" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          onClick={toggleMobileMenu}
          className={`fixed inset-0 z-40 bg-[#75e6da]  transition-opacity duration-500 lg:hidden ${
            isMobileMenuOpen ? "opacity-100 bg-black/60 backdrop-blur-sm" : "opacity-0 pointer-events-none"
          }`}
        ></div>

        {/* Mobile Menu - MODIFIED FOR RIGHT-TO-LEFT SLIDE */}
        <div
          className={`fixed top-0 right-0 h-full w-70 bg-[#75e6da] backdrop-blur-2xl z-50 shadow-2xl transition-transform duration-500 ease-in-out lg:hidden ${
            isMobileMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
          }`}
        >
          <div className="px-6 py-8 space-y-6 h-full overflow-y-auto">
            {/* Logo and close button inside the menu */}
            <div className="flex items-center justify-between ">
                <div className="flex items-center group cursor-pointer " onClick={() => handleNavigation("/")}>
                  {/* <img src={VerifyMyKyc || AppLogo || "/placeholder.svg"} className="w-40 h-auto" alt="App Logo" /> */}
<h4 class="text-3xl font-bold flex items-center gap-1">
  <span class="text-green-600">Verify</span>
  <span class="text-blue-600">e-</span>
  <span class="text-orange-500">kyc</span>
</h4>
                </div>
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-gray-100 rounded-xl transition-all duration-200" onClick={toggleMobileMenu}>
                    <X size={24} className="text-slate-600" />
                </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-4 pt-4">
              {navigationItems.map((item) => (
                <div key={item.name} className="space-y-3">
                  {item.name === "Products" && processedProducts ? (
                    <div>
                      <button
                        onClick={() => setActiveMobileDropdown(activeMobileDropdown === item.name ? null : item.name)}
                        className="flex items-center justify-between w-full text-left font-semibold text-xl text-slate-800 hover:text-[#1987BF] transition-colors duration-300 py-4 px-2 rounded-lg hover:bg-slate-50/50"
                      >
                        <span className="tracking-wide">{item.name}</span>
                        <ChevronDown
                          className={`w-6 h-6 transition-transform duration-300 ${activeMobileDropdown === item.name ? "rotate-180 text-[#1987BF]" : ""}`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${activeMobileDropdown === item.name ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="pl-4 space-y-3 pt-3">
                          {Object.keys(processedProducts).map((category) => (
                            <div key={category}>
                              <button
                                onClick={() =>
                                  setActiveMobileSubDropdown(activeMobileSubDropdown === category ? null : category)
                                }
                                className="flex items-center justify-between w-full text-left font-medium text-lg text-slate-700 hover:text-[#1987BF] transition-colors duration-200 py-3 px-3 rounded-lg hover:bg-slate-50/50"
                              >
                                <span className="tracking-wide">{category}</span>
                                <ChevronDown
                                  className={`w-5 h-5 transition-transform duration-300 ${activeMobileSubDropdown === category ? "rotate-180 text-[#1987BF]" : ""}`}
                                />
                              </button>
                              <div
                                className={`overflow-hidden transition-all duration-400 ease-out ${activeMobileSubDropdown === category ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                              >
                                <div className="pl-4 space-y-3 pt-2">
                                  {processedProducts[category].map((service) => (
                                    service._id === "static-pan" || service._id === "static-aadhar" ? (
                                      <div
                                        key={service._id}
                                        className="block py-3 px-3 text-base text-slate-400 cursor-not-allowed rounded-lg bg-slate-50/30"
                                      >
                                        <div className="font-medium">{service.name}</div>
                                        <div className="text-xs text-slate-400 mt-1">Coming Soon</div>
                                      </div>
                                    ) : (
                                      <a
                                        key={service._id}
                                        href={`/product/${service._id}`}
                                        onClick={(e) => {
                                          e.preventDefault()
                                          handleNavigation(`/product/${service._id}`)
                                        }}
                                        className="block py-3 px-3 text-base text-slate-600 hover:text-[#1987BF] hover:bg-slate-50/50 transition-all duration-200 cursor-pointer rounded-lg font-medium"
                                      >
                                        {service.name}
                                      </a>
                                    )
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setActiveMobileDropdown(activeMobileDropdown === item.name ? null : item.name)}
                        className="flex items-center justify-between w-full text-left font-semibold text-xl text-slate-800 hover:text-[#1987BF] transition-colors duration-300 py-4 px-2 rounded-lg hover:bg-slate-50/50"
                      >
                        <span className="tracking-wide">{item.name}</span>
                        <ChevronDown
                          className={`w-6 h-6 transition-transform duration-300 ${activeMobileDropdown === item.name ? "rotate-180 text-[#1987BF]" : ""}`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-400 ease-out ${activeMobileDropdown === item.name ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="pl-4 space-y-4 pt-3">
                          {item.items?.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              onClick={(e) => {
                                e.preventDefault()
                                handleNavigation(subItem.href)
                              }}
                              className="block py-3 px-3 text-lg text-slate-600 hover:text-[#1987BF] hover:bg-slate-50/50 transition-colors duration-200 cursor-pointer rounded-lg font-medium"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavigation(item.href)
                      }}
                      className="flex items-center justify-between w-full text-left font-semibold text-xl text-slate-800 hover:text-[#1987BF] transition-colors duration-300 py-4 px-2 rounded-lg hover:bg-slate-50/50"
                    >
                      <span className="tracking-wide">{item.name}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="pt-8 border-t border-gray-200/60 space-y-5">
              <Button
                variant="outline"
                className="w-full justify-center bg-transparent border-2 border-slate-200 text-slate-700 hover:border-[#1987BF] hover:text-[#1987BF] hover:bg-[#1987BF]/5 text-lg py-4 rounded-xl font-semibold transition-all duration-300"
                onClick={() => handleNavigation("/contact-us")}
              >
                <Phone className="w-5 h-5 mr-3" />
                Contact Sales
              </Button>
              {user ? (
                <Button
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={navigateToUserAccount}
                >
                  <User className="w-5 h-5 mr-2" />
                  Go to Account
                </Button>
              ) : (
                <Button
                  className="w-full bg-gray-900 hover:from-red-600 hover:to-red-700 text-white font-semibold text-lg py-4"
                  onClick={() => handleNavigation("/signup")}
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
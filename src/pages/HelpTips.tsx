
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Globe, 
  Home,
  UserCheck,
  CreditCard,
  Shield,
  Phone,
  Mail,
  Target,
  Star,
  Clock
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HelpTips = () => {
  const [selectedCountry, setSelectedCountry] = useState("netherlands");

  const subletLaws = {
    netherlands: {
      name: "Netherlands",
      summary: "Subletting requires landlord permission and rent control compliance",
      keyPoints: [
        "Written permission from landlord required",
        "Cannot charge more than your own rent",
        "Maximum sublet period of 2 years",
        "Must register with municipality"
      ],
      links: [
        { title: "Government Subletting Guidelines", url: "https://www.government.nl/topics/housing/renting-a-house" },
        { title: "Rent Control Information", url: "https://www.huurcommissie.nl/english" },
        { title: "Municipality Registration", url: "https://www.government.nl/topics/population-register" }
      ],
      penalties: "Fines up to €4,350 for illegal subletting"
    },
    germany: {
      name: "Germany",
      summary: "Subletting allowed with landlord consent, strict rental laws apply",
      keyPoints: [
        "Landlord consent required (Untervermietungserlaubnis)",
        "Cannot exceed 50% of apartment without consent",
        "Rent increases limited by local rent index",
        "Tenant protection laws very strong"
      ],
      links: [
        { title: "German Tenancy Law", url: "https://www.germany.travel/en/ms/german-law/tenancy-law.html" },
        { title: "Subletting Rights", url: "https://www.mieterbund.de/english.html" },
        { title: "Registration (Anmeldung)", url: "https://service.berlin.de/en/" }
      ],
      penalties: "Possible termination of lease and damages"
    },
    france: {
      name: "France",
      summary: "Subletting regulated, requires written agreement and rent control",
      keyPoints: [
        "Written landlord authorization required",
        "Cannot exceed original rent amount",
        "Must provide 3-month notice to end sublease",
        "Social housing subletting often prohibited"
      ],
      links: [
        { title: "French Housing Law", url: "https://www.service-public.fr/particuliers/vosdroits/F920" },
        { title: "ADIL Housing Information", url: "https://www.anil.org/en/" },
        { title: "Prefecture Services", url: "https://www.demarches.interieur.gouv.fr/" }
      ],
      penalties: "Termination of lease and potential legal action"
    },
    spain: {
      name: "Spain",
      summary: "Subletting allowed with restrictions, regional variations apply",
      keyPoints: [
        "Landlord permission generally required",
        "Duration limited to lease term",
        "Tourist subletting highly regulated",
        "Tax obligations on rental income"
      ],
      links: [
        { title: "Spanish Housing Ministry", url: "https://www.mitma.gob.es/vivienda" },
        { title: "Consumer Rights", url: "https://www.consumo.gob.es/" },
        { title: "NIE Registration", url: "https://www.sanidad.gob.es/en/home.htm" }
      ],
      penalties: "Fines and possible lease termination"
    }
  };

  const registrationSteps = {
    netherlands: [
      { step: "Arrive in Netherlands", action: "Get temporary accommodation if needed" },
      { step: "Register with Municipality", action: "Visit local city hall within 5 days", required: true },
      { step: "Get BSN Number", action: "Received automatically upon registration", required: true },
      { step: "Open Bank Account", action: "Visit bank with BSN and passport", required: true },
      { step: "Get Health Insurance", action: "Mandatory within 4 months", required: true },
      { step: "Register with Tax Office", action: "If working or studying", required: false }
    ],
    germany: [
      { step: "Find Accommodation", action: "Secure housing before arrival if possible" },
      { step: "Anmeldung Registration", action: "Register address within 14 days", required: true },
      { step: "Get Tax ID", action: "Automatic after registration", required: true },
      { step: "Open Bank Account", action: "Needed for most transactions", required: true },
      { step: "Health Insurance", action: "Mandatory for all residents", required: true },
      { step: "University Enrollment", action: "If applicable", required: false }
    ],
    france: [
      { step: "Validate Visa", action: "If required, validate within 3 months" },
      { step: "Open Bank Account", action: "Often needed for accommodation", required: true },
      { step: "Get Social Security", action: "Register with CPAM", required: true },
      { step: "Prefecture Registration", action: "For residence permit if needed", required: true },
      { step: "Tax Registration", action: "Get tax number", required: false },
      { step: "CAF Housing Aid", action: "Apply for housing assistance", required: false }
    ],
    spain: [
      { step: "Get NIE Number", action: "Foreigner identification number", required: true },
      { step: "Open Bank Account", action: "Usually requires NIE", required: true },
      { step: "Register with Municipality", action: "Empadronamiento certificate", required: true },
      { step: "Social Security", action: "If working or studying", required: false },
      { step: "Health Card", action: "Access to healthcare", required: true },
      { step: "Tax Registration", action: "If earning income", required: false }
    ]
  };

  const countries = Object.keys(subletLaws);

  const profileTips = [
    {
      title: "Complete Your Academic Profile",
      description: "Include your university, program, and study period details",
      icon: <UserCheck className="h-5 w-5 text-green-600" />,
      tips: [
        "Use your official university email for verification",
        "Be specific about your exchange program dates",
        "Include your field of study and year level",
        "Mention any specific academic requirements"
      ]
    },
    {
      title: "Define Your Housing Preferences",
      description: "Be clear about what type of accommodation you're seeking",
      icon: <Home className="h-5 w-5 text-blue-600" />,
      tips: [
        "Specify preferred location or neighborhood",
        "Indicate accommodation type (studio, shared, etc.)",
        "Mention important amenities (WiFi, kitchen, etc.)",
        "Set realistic expectations for housing standards"
      ]
    },
    {
      title: "Set Accurate Availability",
      description: "Provide precise dates for your exchange period",
      icon: <Clock className="h-5 w-5 text-purple-600" />,
      tips: [
        "Include some flexibility in your dates if possible",
        "Consider travel time before and after studies",
        "Account for visa processing time",
        "Update dates if your plans change"
      ]
    },
    {
      title: "Optimize for Better Matches",
      description: "Help our algorithm find the most compatible partners",
      icon: <Target className="h-5 w-5 text-orange-600" />,
      tips: [
        "Be honest about your lifestyle and habits",
        "Include information about your academic goals",
        "Mention language skills and preferences",
        "Add details about your home city/accommodation"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-swap-blue mb-4">Help & Tips</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the most out of SwapSpot's matching system and prepare for your exchange
            </p>
          </div>

          <Tabs defaultValue="matching" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="matching">Matching Tips</TabsTrigger>
              <TabsTrigger value="legal">Legal Info</TabsTrigger>
              <TabsTrigger value="preparation">Exchange Prep</TabsTrigger>
            </TabsList>

            {/* Matching Tips Tab */}
            <TabsContent value="matching" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    How to Get Better Matches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {profileTips.map((tip, index) => (
                      <div key={index} className="border rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                          {tip.icon}
                          <h3 className="font-semibold">{tip.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{tip.description}</p>
                        <ul className="space-y-2">
                          {tip.tips.map((tipItem, tipIndex) => (
                            <li key={tipIndex} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>{tipItem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  <Alert className="mt-6">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Pro Tip:</strong> The more complete and accurate your profile, the better matches you'll receive. Our algorithm works best with detailed information about your preferences and requirements.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Understanding Your Match Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">High Compatibility (90%+)</h4>
                      <p className="text-sm text-green-700">Excellent match with aligned dates, location preferences, and academic goals.</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Good Match (70-89%)</h4>
                      <p className="text-sm text-blue-700">Strong compatibility with minor differences that may be negotiable.</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Potential Match (50-69%)</h4>
                      <p className="text-sm text-yellow-700">Some compatibility factors align, but may require more discussion.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Legal Info Tab */}
            <TabsContent value="legal" className="space-y-6">
              {/* Country Selector */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Select Your Country</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {countries.map((country) => (
                    <Button
                      key={country}
                      variant={selectedCountry === country ? "default" : "outline"}
                      onClick={() => setSelectedCountry(country)}
                      className="capitalize"
                    >
                      {subletLaws[country].name}
                    </Button>
                  ))}
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Subletting Laws in {subletLaws[selectedCountry].name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Summary:</strong> {subletLaws[selectedCountry].summary}
                    </AlertDescription>
                  </Alert>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Requirements</h3>
                    <ul className="space-y-2">
                      {subletLaws[selectedCountry].keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">⚠️ Penalties for Illegal Subletting</h4>
                    <p className="text-red-700">{subletLaws[selectedCountry].penalties}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Official Resources</h3>
                    <div className="space-y-2">
                      {subletLaws[selectedCountry].links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-swap-blue hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {link.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Exchange Preparation Tab */}
            <TabsContent value="preparation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Registration Steps in {subletLaws[selectedCountry].name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {registrationSteps[selectedCountry].map((item, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-swap-blue text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{item.step}</h4>
                            {item.required && (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            )}
                          </div>
                          <p className="text-gray-600">{item.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Essential Resources */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Essential Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <a href="https://www.embassyworld.com/" target="_blank" rel="noopener noreferrer" 
                         className="flex items-center gap-2 text-swap-blue hover:underline">
                        <ExternalLink className="h-4 w-4" />
                        Embassy Finder Worldwide
                      </a>
                      <a href="https://www.xe.com/currencyconverter/" target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-2 text-swap-blue hover:underline">
                        <CreditCard className="h-4 w-4" />
                        Currency Converter
                      </a>
                      <a href="https://www.timeanddate.com/worldclock/" target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-2 text-swap-blue hover:underline">
                        <Globe className="h-4 w-4" />
                        World Time Zones
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contacts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Emergency Numbers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>EU Emergency:</strong> 112
                      </div>
                      <div>
                        <strong>Netherlands:</strong> 112
                      </div>
                      <div>
                        <strong>Germany:</strong> 112
                      </div>
                      <div>
                        <strong>France:</strong> 112
                      </div>
                      <div>
                        <strong>Spain:</strong> 112
                      </div>
                      <div>
                        <strong>UK:</strong> 999
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <Card className="mt-8 bg-gradient-to-r from-swap-blue to-swap-darkBlue text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Match?</h3>
              <p className="mb-6">Complete your profile and let our intelligent matching system find compatible students for you</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" asChild>
                  <a href="/signup">Create Your Profile</a>
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-swap-blue" asChild>
                  <a href="/community">Join Community Chat</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpTips;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, Shield, Home, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [university, setUniversity] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [gdprConsent, setGdprConsent] = useState(false);

  // Apartment details
  const [apartmentDetails, setApartmentDetails] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    surface: "",
    description: "",
    amenities: [] as string[],
    photos: [] as File[]
  });

  // Destination preferences
  const [preferences, setPreferences] = useState({
    preferredCountries: [] as string[],
    maxPrice: "",
    minBedrooms: "",
    minSurface: "",
    preferredAmenities: [] as string[],
    startDate: "",
    endDate: ""
  });

  const navigate = useNavigate();

  const availableAmenities = [
    "WiFi", "Kitchen", "Washing Machine", "Balcony", "Parking", 
    "Air Conditioning", "Heating", "Furnished", "Pet Friendly", "Gym Access"
  ];

  const europeanCountries = [
    "Netherlands", "Germany", "France", "Spain", "Italy", "Portugal",
    "Belgium", "Austria", "Switzerland", "Sweden", "Norway", "Denmark",
    "Finland", "Poland", "Czech Republic", "Hungary", "Greece", "Croatia"
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < 3) {
      // For first two steps, validate basic info and proceed
      if (currentStep === 1) {
        if (!email || !email.includes('@') || !email.includes('.')) {
          setError("Please enter a valid email address");
          return;
        }
      }
      setCurrentStep(currentStep + 1);
      return;
    }

    // Final validation for step 3
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError("Please enter a valid email address");
      return;
    }

    if (!apartmentDetails.title || !apartmentDetails.location || !apartmentDetails.price) {
      setError("Please fill in all required apartment details");
      return;
    }

    if (!preferences.maxPrice || !preferences.startDate || !preferences.endDate) {
      setError("Please fill in all required preferences");
      return;
    }

    if (!gdprConsent) {
      setError("You must agree to the Privacy Policy to create an account");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    try {
      const demoUserData = {
        email,
        fullName,
        university: university || "University of Amsterdam",
        hasUploadedProof: !!file,
        timestamp: new Date().toISOString(),
        isDemoUser: true,
        apartmentDetails,
        preferences,
        gdprConsent: true
      };
      
      localStorage.setItem('demoUserData', JSON.stringify(demoUserData));
      localStorage.setItem('signupData', JSON.stringify(demoUserData));
      
      toast.success("Account created successfully!", {
        description: "Your apartment and preferences have been saved!"
      });
      
      setTimeout(() => {
        navigate("/onboarding");
      }, 1000);
      
    } catch (error) {
      console.error("Error in signup process:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleApartmentPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setApartmentDetails(prev => ({
        ...prev,
        photos: Array.from(e.target.files!)
      }));
    }
  };

  const toggleAmenity = (amenity: string, type: 'apartment' | 'preference') => {
    if (type === 'apartment') {
      setApartmentDetails(prev => ({
        ...prev,
        amenities: prev.amenities.includes(amenity)
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        preferredAmenities: prev.preferredAmenities.includes(amenity)
          ? prev.preferredAmenities.filter(a => a !== amenity)
          : [...prev.preferredAmenities, amenity]
      }));
    }
  };

  const toggleCountry = (country: string) => {
    setPreferences(prev => ({
      ...prev,
      preferredCountries: prev.preferredCountries.includes(country)
        ? prev.preferredCountries.filter(c => c !== country)
        : [...prev.preferredCountries, country]
    }));
  };

  const universities = [
    "University of Amsterdam", "Sorbonne University", "Heidelberg University",
    "Cambridge University", "Oxford University", "Politecnico di Milano",
    "Technical University of Berlin", "Uppsala University", 
    "Complutense University of Madrid", "IE University Madrid",
    "Erasmus University Rotterdam", "Harvard University", "Stanford University",
    "MIT", "UC Berkeley", "New York University", "Other"
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-swap-blue">Join SwapSpot</h1>
            <p className="mt-2 text-gray-600">
              List your apartment and find your perfect swap
            </p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Step {currentStep} of 3
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Demo Mode
              </Badge>
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="yourname@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500">
                      Use your university email if possible
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                    <Select value={university} onValueChange={setUniversity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your university" />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map((uni) => (
                          <SelectItem key={uni} value={uni}>
                            {uni}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="proof">Proof of enrollment (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                      <label className="cursor-pointer">
                        <Input
                          id="proof"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-8 w-8 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {file ? file.name : "Upload student card or university letter"}
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Next: Your Apartment Details
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Apartment Details */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Your Apartment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Apartment Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Cozy Studio in City Center"
                      value={apartmentDetails.title}
                      onChange={(e) => setApartmentDetails(prev => ({...prev, title: e.target.value}))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Amsterdam, Netherlands"
                      value={apartmentDetails.location}
                      onChange={(e) => setApartmentDetails(prev => ({...prev, location: e.target.value}))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Monthly Rent (€)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="800"
                        value={apartmentDetails.price}
                        onChange={(e) => setApartmentDetails(prev => ({...prev, price: e.target.value}))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        placeholder="1"
                        value={apartmentDetails.bedrooms}
                        onChange={(e) => setApartmentDetails(prev => ({...prev, bedrooms: e.target.value}))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surface">Surface (m²)</Label>
                      <Input
                        id="surface"
                        type="number"
                        placeholder="45"
                        value={apartmentDetails.surface}
                        onChange={(e) => setApartmentDetails(prev => ({...prev, surface: e.target.value}))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Amenities</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableAmenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={`apt-${amenity}`}
                            checked={apartmentDetails.amenities.includes(amenity)}
                            onCheckedChange={() => toggleAmenity(amenity, 'apartment')}
                          />
                          <Label htmlFor={`apt-${amenity}`} className="text-sm">{amenity}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your apartment..."
                      value={apartmentDetails.description}
                      onChange={(e) => setApartmentDetails(prev => ({...prev, description: e.target.value}))}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photos">Apartment Photos</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                      <label className="cursor-pointer">
                        <Input
                          id="photos"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleApartmentPhotos}
                          className="hidden"
                        />
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-8 w-8 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {apartmentDetails.photos.length > 0 
                              ? `${apartmentDetails.photos.length} photos selected`
                              : "Upload apartment photos"
                            }
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                      Previous
                    </Button>
                    <Button type="submit" className="flex-1">
                      Next: Your Preferences
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Destination Preferences */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Where Do You Want to Go?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Preferred Countries</Label>
                    <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                      {europeanCountries.map((country) => (
                        <div key={country} className="flex items-center space-x-2">
                          <Checkbox
                            id={country}
                            checked={preferences.preferredCountries.includes(country)}
                            onCheckedChange={() => toggleCountry(country)}
                          />
                          <Label htmlFor={country} className="text-sm">{country}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={preferences.startDate}
                        onChange={(e) => setPreferences(prev => ({...prev, startDate: e.target.value}))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={preferences.endDate}
                        onChange={(e) => setPreferences(prev => ({...prev, endDate: e.target.value}))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxPrice">Max Budget (€)</Label>
                      <Input
                        id="maxPrice"
                        type="number"
                        placeholder="1000"
                        value={preferences.maxPrice}
                        onChange={(e) => setPreferences(prev => ({...prev, maxPrice: e.target.value}))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minBedrooms">Min Bedrooms</Label>
                      <Input
                        id="minBedrooms"
                        type="number"
                        placeholder="1"
                        value={preferences.minBedrooms}
                        onChange={(e) => setPreferences(prev => ({...prev, minBedrooms: e.target.value}))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minSurface">Min Surface (m²)</Label>
                      <Input
                        id="minSurface"
                        type="number"
                        placeholder="30"
                        value={preferences.minSurface}
                        onChange={(e) => setPreferences(prev => ({...prev, minSurface: e.target.value}))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Amenities</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableAmenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={`pref-${amenity}`}
                            checked={preferences.preferredAmenities.includes(amenity)}
                            onCheckedChange={() => toggleAmenity(amenity, 'preference')}
                          />
                          <Label htmlFor={`pref-${amenity}`} className="text-sm">{amenity}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GDPR Consent Checkbox */}
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <Checkbox
                        id="gdpr-consent"
                        checked={gdprConsent}
                        onCheckedChange={(checked) => setGdprConsent(checked === true)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor="gdpr-consent" className="text-sm leading-relaxed">
                          I agree to the collection and processing of my data in accordance with the{" "}
                          <Link 
                            to="/privacy-policy" 
                            target="_blank"
                            className="text-swap-blue font-semibold hover:underline"
                          >
                            Privacy Policy
                          </Link>
                          . I understand that my data will be used to match me with accommodation exchange opportunities and that I can withdraw my consent at any time.
                        </Label>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                      Previous
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isLoading || !gdprConsent}>
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        "Create Account & Complete Setup"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
          
          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account? <Link to="/login" className="text-swap-blue font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;

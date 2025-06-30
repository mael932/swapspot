
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, Building2, Info } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";
import UniversitySelect from "./UniversitySelect";

interface UniversityStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

// Popular universities for autocomplete
const UNIVERSITIES = [
  "Harvard University",
  "Stanford University",
  "Massachusetts Institute of Technology (MIT)",
  "University of California, Berkeley",
  "University of California, Los Angeles (UCLA)",
  "Yale University",
  "Princeton University",
  "Columbia University",
  "University of Chicago",
  "University of Pennsylvania",
  "Cornell University",
  "Duke University",
  "Northwestern University",
  "Johns Hopkins University",
  "Dartmouth College",
  "Brown University",
  "Vanderbilt University",
  "Rice University",
  "Washington University in St. Louis",
  "University of Notre Dame",
  "Georgetown University",
  "Carnegie Mellon University",
  "University of Virginia",
  "University of Michigan",
  "University of North Carolina at Chapel Hill",
  "Wake Forest University",
  "New York University",
  "Boston College",
  "College of William & Mary",
  "University of Rochester",
  "Brandeis University",
  "Case Western Reserve University",
  "University of California, San Diego",
  "Boston University",
  "Tulane University",
  "University of Southern California",
  "University of California, Santa Barbara",
  "University of California, Irvine",
  "University of California, Davis",
  "Pepperdine University",
  "University of Miami",
  "University of Texas at Austin",
  "Georgia Institute of Technology",
  "University of Wisconsin-Madison",
  "Pennsylvania State University",
  "University of Illinois at Urbana-Champaign",
  "Ohio State University",
  "University of Washington",
  "Purdue University",
  "University of Georgia",
  "Texas A&M University",
  "University of Florida",
  "University of Maryland",
  "University of Pittsburgh",
  "Michigan State University",
  "Indiana University",
  "University of Minnesota",
  "University of Iowa",
  "Arizona State University",
  "University of Arizona",
  "University of Colorado Boulder",
  "University of Utah",
  "University of Oregon",
  "University of Kansas",
  "University of Nebraska-Lincoln",
  "University of Oklahoma",
  "University of Alabama",
  "Auburn University",
  "University of Tennessee",
  "University of Kentucky",
  "Louisiana State University",
  "University of Arkansas",
  "University of Mississippi",
  "Mississippi State University",
  "Florida State University",
  "University of South Carolina",
  "Clemson University",
  "North Carolina State University",
  "Virginia Tech",
  "West Virginia University",
  "University of Delaware",
  "University of Connecticut",
  "University of Rhode Island",
  "University of Vermont",
  "University of New Hampshire",
  "University of Maine",
  "University of Massachusetts Amherst",
  "Northeastern University",
  "University of California, Riverside",
  "University of California, Santa Cruz",
  "University of California, Merced",
  "California Institute of Technology (Caltech)",
  "University of San Diego",
  "San Diego State University",
  "California State University, Long Beach",
  "California State University, Fullerton",
  "San Francisco State University",
  "San Jose State University",
  "California Polytechnic State University",
  "University of the Pacific",
  "Santa Clara University",
  "Loyola Marymount University",
  "Occidental College",
  "Pomona College",
  "Claremont McKenna College",
  "Harvey Mudd College",
  "Scripps College",
  "Pitzer College",
  // International Universities
  "University of Oxford",
  "University of Cambridge",
  "Imperial College London",
  "London School of Economics",
  "University College London",
  "King's College London",
  "University of Edinburgh",
  "University of Manchester",
  "University of Warwick",
  "University of Bristol",
  "University of Bath",
  "University of St Andrews",
  "Durham University",
  "University of York",
  "University of Exeter",
  "University of Southampton",
  "University of Birmingham",
  "University of Sheffield",
  "University of Nottingham",
  "University of Leeds",
  "University of Glasgow",
  "University of Liverpool",
  "Newcastle University",
  "Cardiff University",
  "Queen Mary University of London",
  "Lancaster University",
  "University of Sussex",
  "University of Leicester",
  "University of Reading",
  "Loughborough University",
  "University of Surrey",
  "Brunel University London",
  "City, University of London",
  "Goldsmiths, University of London",
  "Royal Holloway, University of London",
  "SOAS University of London",
  "Birkbeck, University of London",
  "University of Westminster",
  "Middlesex University",
  "University of Greenwich",
  "University of East London",
  "London Metropolitan University",
  "University of Bedfordshire",
  "University of Hertfordshire",
  "Anglia Ruskin University",
  "University of Essex",
  "University of Kent",
  "Canterbury Christ Church University",
  "University for the Creative Arts",
  "University of Brighton",
  "University of Portsmouth",
  "Bournemouth University",
  "University of Plymouth",
  "University of the West of England",
  "Bath Spa University",
  "University of Gloucestershire",
  "University of Worcester",
  "Coventry University",
  "De Montfort University",
  "University of Lincoln",
  "University of Derby",
  "Nottingham Trent University",
  "Sheffield Hallam University",
  "Manchester Metropolitan University",
  "University of Central Lancashire",
  "University of Bolton",
  "University of Salford",
  "Liverpool John Moores University",
  "Liverpool Hope University",
  "Edge Hill University",
  "University of Chester",
  "Staffordshire University",
  "Keele University",
  "Birmingham City University",
  "Aston University",
  "University of Wolverhampton",
  "University of Huddersfield",
  "University of Bradford",
  "Leeds Beckett University",
  "York St John University",
  "University of Hull",
  "Hull York Medical School",
  "University of Sunderland",
  "Northumbria University",
  "Teesside University",
  "University of Cumbria",
  "Sorbonne University",
  "École Normale Supérieure",
  "École Polytechnique",
  "Sciences Po",
  "HEC Paris",
  "INSEAD",
  "University of Paris",
  "Pierre and Marie Curie University",
  "Paris Diderot University",
  "École Centrale Paris",
  "CentraleSupélec",
  "Télécom Paris",
  "École des Mines de Paris",
  "Institut National des Sciences Appliquées",
  "Université Grenoble Alpes",
  "University of Lyon",
  "Aix-Marseille University",
  "University of Toulouse",
  "University of Bordeaux",
  "University of Strasbourg",
  "University of Lille",
  "University of Rennes",
  "University of Nantes",
  "University of Montpellier",
  "University of Nice Sophia Antipolis",
  "Technical University of Munich",
  "Ludwig Maximilian University of Munich",
  "Heidelberg University",
  "Humboldt University of Berlin",
  "Free University of Berlin",
  "Technical University of Berlin",
  "University of Hamburg",
  "University of Cologne",
  "University of Frankfurt",
  "University of Stuttgart",
  "Karlsruhe Institute of Technology",
  "RWTH Aachen University",
  "Technical University of Dresden",
  "University of Göttingen",
  "University of Würzburg",
  "University of Tübingen",
  "University of Freiburg",
  "University of Bonn",
  "University of Münster",
  "University of Mannheim",
  "University of Konstanz",
  "University of Ulm",
  "University of Bayreuth",
  "University of Erlangen-Nuremberg",
  "University of Regensburg",
  "University of Passau",
  "University of Augsburg",
  "University of Bremen",
  "University of Oldenburg",
  "University of Hannover",
  "University of Göttingen",
  "University of Marburg",
  "University of Gießen",
  "University of Kassel",
  "University of Paderborn",
  "University of Siegen",
  "University of Wuppertal",
  "University of Duisburg-Essen",
  "University of Dortmund",
  "University of Bochum",
  "University of Düsseldorf",
  "University of Kiel",
  "University of Lübeck",
  "University of Rostock",
  "University of Greifswald",
  "University of Magdeburg",
  "University of Halle-Wittenberg",
  "University of Leipzig",
  "Technical University of Chemnitz",
  "University of Jena",
  "University of Erfurt",
  "University of Weimar",
  "University of Ilmenau"
];

const EXCHANGE_UNIVERSITIES = [
  // Same list but focused on popular exchange destinations
  ...UNIVERSITIES,
  "University of Melbourne",
  "University of Sydney",
  "Australian National University",
  "University of Queensland",
  "Monash University",
  "University of New South Wales",
  "University of Western Australia",
  "University of Adelaide",
  "University of Tokyo",
  "Kyoto University",
  "Osaka University",
  "Tohoku University",
  "Nagoya University",
  "Hokkaido University",
  "Kyushu University",
  "Tokyo Institute of Technology",
  "Waseda University",
  "Keio University",
  "National University of Singapore",
  "Nanyang Technological University",
  "University of Hong Kong",
  "Chinese University of Hong Kong",
  "Hong Kong University of Science and Technology",
  "Seoul National University",
  "Korea Advanced Institute of Science and Technology",
  "Yonsei University",
  "Korea University",
  "Peking University",
  "Tsinghua University",
  "Fudan University",
  "Shanghai Jiao Tong University",
  "University of Toronto",
  "University of British Columbia",
  "McGill University",
  "University of Alberta",
  "McMaster University",
  "University of Waterloo",
  "Queen's University",
  "University of Ottawa",
  "Concordia University",
  "Simon Fraser University"
];

const UniversityStep: React.FC<UniversityStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}) => {
  const [university, setUniversity] = useState(data.university || "");
  const [exchangeUniversity, setExchangeUniversity] = useState(data.exchangeUniversity || "");
  const [program, setProgram] = useState(data.program || "");
  const [matchingConsent, setMatchingConsent] = useState(data.matchingConsent || false);

  const handleUniversityChange = (value: string) => {
    setUniversity(value);
    onUpdate({ ...data, university: value });
  };

  const handleExchangeUniversityChange = (value: string) => {
    setExchangeUniversity(value);
    onUpdate({ ...data, exchangeUniversity: value });
  };

  const handleProgramChange = (value: string) => {
    setProgram(value);
    onUpdate({ ...data, program: value });
  };

  const handleMatchingConsentChange = (checked: boolean) => {
    setMatchingConsent(checked);
    onUpdate({ ...data, matchingConsent: checked });
  };

  const canProceed = university && exchangeUniversity && program && matchingConsent;

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <GraduationCap className="h-16 w-16 text-swap-blue mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          Find Your Perfect Match!
        </h3>
        <p className="text-gray-600 text-lg">
          Tell us about your university exchange program
        </p>
      </div>

      {/* Data Usage Consent */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="matching-consent"
            checked={matchingConsent}
            onCheckedChange={handleMatchingConsentChange}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor="matching-consent" className="text-sm font-medium text-blue-800 leading-relaxed cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4" />
                Data Usage for Matching
              </div>
              I consent to SwapSpot using my profile information, preferences, and accommodation details to find and suggest potential matches with other students. This helps us provide you with the best possible accommodation exchange opportunities.
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <UniversitySelect
          value={university}
          onChange={handleUniversityChange}
          placeholder="e.g., University of California, Berkeley"
          label="Your Current University *"
          universities={UNIVERSITIES}
        />

        <UniversitySelect
          value={exchangeUniversity}
          onChange={handleExchangeUniversityChange}
          placeholder="e.g., Sorbonne University, Paris"
          label="Exchange Destination University *"
          universities={EXCHANGE_UNIVERSITIES}
        />

        <div className="space-y-2">
          <Label htmlFor="program" className="text-base font-medium">
            Program/Field of Study *
          </Label>
          <Input
            id="program"
            type="text"
            placeholder="e.g., Business Administration, Computer Science"
            value={program}
            onChange={(e) => handleProgramChange(e.target.value)}
            className="border-gray-300 focus:border-swap-blue"
            required
          />
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-700">
          💡 <strong>No account needed yet!</strong> Complete your preferences first, then we'll help you create an account to save everything.
        </p>
      </div>

      {!matchingConsent && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Please consent to data usage for matching to continue with your profile setup.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-4 pt-6">
        {canGoPrevious && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onPrevious} 
            className="flex-1 h-12"
          >
            Previous
          </Button>
        )}
        <Button 
          onClick={onNext} 
          disabled={!canProceed || !canGoNext}
          className="flex-1 h-12 bg-swap-blue hover:bg-swap-blue/90 text-white font-medium"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default UniversityStep;

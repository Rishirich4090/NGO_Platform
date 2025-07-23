import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { 
  Users, 
  Heart, 
  Shield, 
  Award,
  Upload,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  CheckCircle,
  Clock,
  FileText,
  Download,
  MessageCircle,
  Bell,
  Settings,
  Camera,
  Send
} from "lucide-react";

interface MembershipFormData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  reason: string;
  photo: File | null;
}

export default function Membership() {
  const [activeTab, setActiveTab] = useState("apply");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [memberStatus, setMemberStatus] = useState<"none" | "pending" | "approved">("none");
  const [formData, setFormData] = useState<MembershipFormData>({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    reason: "",
    photo: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setMemberStatus("pending");
    
    // Switch to status tab after submission
    setTimeout(() => {
      setActiveTab("status");
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      photo: file
    }));
  };

  const benefits = [
    {
      icon: Heart,
      title: "Make Direct Impact",
      description: "Your membership directly funds life-changing projects worldwide"
    },
    {
      icon: Users,
      title: "Global Community",
      description: "Connect with like-minded changemakers from around the world"
    },
    {
      icon: FileText,
      title: "Official Certificate",
      description: "Receive a personalized membership certificate upon approval"
    },
    {
      icon: MessageCircle,
      title: "Member Chat",
      description: "Access to exclusive member-only group chat and discussions"
    },
    {
      icon: Bell,
      title: "Project Updates",
      description: "Get exclusive updates on projects and impact reports"
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Be recognized for your contributions to positive change"
    }
  ];

  const requirements = [
    "Be at least 18 years old",
    "Provide valid contact information",
    "Upload a recent photograph",
    "Explain your motivation for joining",
    "Agree to our code of conduct",
    "Commit to our mission and values"
  ];

  const process = [
    {
      step: "1",
      title: "Submit Application",
      description: "Fill out the membership form with all required information",
      icon: FileText
    },
    {
      step: "2",
      title: "Review Process",
      description: "Our admin team reviews your application within 3-5 business days",
      icon: Clock
    },
    {
      step: "3",
      title: "Approval & Certificate",
      description: "Upon approval, receive your membership certificate and dashboard access",
      icon: Award
    }
  ];

  // Mock member data for approved status demo
  const memberData = {
    id: "NGO-2024-001234",
    name: "John Doe",
    joinDate: "March 15, 2024",
    certificateUrl: "#"
  };

  const renderApplicationForm = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" />
          <span>Membership Application</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold">Application Submitted Successfully!</h3>
            <p className="text-muted-foreground">
              Thank you for applying. We'll review your application within 3-5 business days.
            </p>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Status: Pending Approval
            </Badge>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Address Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="12345"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="United States"
                  required
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Profile Photo</h3>
              
              <div className="space-y-2">
                <Label htmlFor="photo">Upload Photo *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                  <label htmlFor="photo" className="cursor-pointer">
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          {formData.photo ? (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          ) : (
                            <Camera className="h-6 w-6 text-primary" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">
                          {formData.photo ? formData.photo.name : "Click to upload photo"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG or GIF (max 5MB)
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Reason for Joining */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Motivation</h3>
              
              <div className="space-y-2">
                <Label htmlFor="reason">Why do you want to join HopeHands? *</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Tell us about your motivation to join our mission and how you'd like to contribute to positive change..."
                  rows={5}
                  required
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting Application...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Membership Application
                </>
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );

  const renderMemberStatus = () => {
    if (memberStatus === "none") {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Application Found</h3>
            <p className="text-muted-foreground mb-6">
              You haven't submitted a membership application yet.
            </p>
            <Button onClick={() => setActiveTab("apply")}>
              Apply for Membership
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (memberStatus === "pending") {
      return (
        <Card>
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Application Under Review</h3>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Status: Pending Approval
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Thank you for your application! Our admin team is currently reviewing your submission. 
              You'll receive an email notification once your application has been processed.
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Submitted:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Expected Response:</strong> Within 3-5 business days</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Welcome to HopeHands!</h3>
            <Badge variant="secondary" className="bg-green-100 text-green-800 mb-4">
              Status: Approved Member
            </Badge>
            <p className="text-muted-foreground">
              Congratulations! Your membership has been approved. You now have access to all member benefits.
            </p>
          </CardContent>
        </Card>

        {/* Member Dashboard */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Member Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Member Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{memberData.name}</p>
                  <p className="text-sm text-muted-foreground">Member ID: {memberData.id}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Join Date:</strong> {memberData.joinDate}</p>
                <p><strong>Status:</strong> <span className="text-green-600">Active Member</span></p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href={memberData.certificateUrl}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Join Member Chat
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                View Announcements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">Join Our Mission</Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Become a{" "}
              <span className="text-primary">HopeHands Member</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Join our global community of changemakers and help us create lasting positive impact in communities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="apply">Apply</TabsTrigger>
                <TabsTrigger value="status">Status</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="benefits" className="space-y-12">
              {/* Membership Benefits */}
              <div className="max-w-4xl mx-auto">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold">Membership Benefits</h2>
                  <p className="text-lg text-muted-foreground">
                    Discover what makes being a HopeHands member special
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                        <CardContent className="p-0 space-y-4">
                          <div className="flex justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                              <Icon className="h-6 w-6 text-primary-foreground" />
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold">{benefit.title}</h3>
                          <p className="text-muted-foreground text-sm">{benefit.description}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Application Process */}
              <div className="max-w-4xl mx-auto">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold">Application Process</h2>
                  <p className="text-lg text-muted-foreground">
                    Simple steps to join our community
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {process.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="text-center space-y-4">
                        <div className="flex justify-center">
                          <div className="relative">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                              <Icon className="h-8 w-8 text-primary-foreground" />
                            </div>
                            <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                              {step.step}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Requirements */}
              <div className="max-w-2xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Membership Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="apply">
              <div className="max-w-2xl mx-auto">
                {renderApplicationForm()}
              </div>
            </TabsContent>

            <TabsContent value="status">
              <div className="max-w-4xl mx-auto">
                {renderMemberStatus()}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}

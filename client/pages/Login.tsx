import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  LogIn,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Heart
} from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
  role: "member" | "admin";
}

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
    role: "member"
  });

  const [signupData, setSignupData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication logic with dummy credentials and donation-generated accounts
      const isDemoAccount =
        (loginData.email === "member@hopehands.org" && loginData.password === "member123" && loginData.role === "member") ||
        (loginData.email === "admin@hopehands.org" && loginData.password === "admin123" && loginData.role === "admin");

      // Check against donation-generated member accounts
      const isDonorAccount = loginData.role === "member" &&
        loginData.email.includes("@") &&
        loginData.password.startsWith("donor");

      const validCredentials = isDemoAccount || isDonorAccount;

      if (validCredentials) {
        // Store mock JWT token
        const mockToken = `jwt.token.${loginData.role}.${Date.now()}`;
        localStorage.setItem("authToken", mockToken);
        localStorage.setItem("userRole", loginData.role);
        localStorage.setItem("userEmail", loginData.email);

        // Dispatch custom event to notify Layout component of auth change
        window.dispatchEvent(new Event("authChange"));

        // Redirect based on role
        if (loginData.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/member/dashboard");
        }
      } else {
        setError("Invalid credentials. Please use the demo credentials provided below.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (signupData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccess("Account created successfully! You can now log in.");
      setActiveTab("login");
      
      // Reset form
      setSignupData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError("");
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError("");
  };

  const features = [
    {
      icon: Heart,
      title: "Make Direct Impact",
      description: "Your membership directly funds life-changing projects"
    },
    {
      icon: User,
      title: "Global Community",
      description: "Connect with changemakers worldwide"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security"
    }
  ];

  return (
    <Layout>
      <section className="py-20 min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Side - Information */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary">Join Our Mission</Badge>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Welcome to{" "}
                  <span className="text-primary">HopeHands</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join our global community of changemakers creating positive impact in communities worldwide.
                </p>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">New to HopeHands?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your member account to access our community, projects, and resources.
                </p>
                <Link to="/membership" className="text-primary hover:underline text-sm font-medium">
                  Learn more about membership →
                </Link>
              </div>

              {/* Demo Credentials */}
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800">Demo Credentials</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-blue-700">Member Account:</p>
                    <p className="text-blue-600">Email: member@hopehands.org</p>
                    <p className="text-blue-600">Password: member123</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-700">Admin Account:</p>
                    <p className="text-blue-600">Email: admin@hopehands.org</p>
                    <p className="text-blue-600">Password: admin123</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="max-w-md mx-auto w-full">
              <Card>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">Access Your Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login" className="flex items-center space-x-2">
                        <LogIn className="h-4 w-4" />
                        <span>Login</span>
                      </TabsTrigger>
                      <TabsTrigger value="signup" className="flex items-center space-x-2">
                        <UserPlus className="h-4 w-4" />
                        <span>Sign Up</span>
                      </TabsTrigger>
                    </TabsList>

                    {/* Success Message */}
                    {success && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-green-800 text-sm">{success}</span>
                      </div>
                    )}

                    {/* Error Message */}
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <span className="text-red-800 text-sm">{error}</span>
                      </div>
                    )}

                    <TabsContent value="login" className="space-y-4">
                      <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="loginEmail">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="loginEmail"
                              name="email"
                              type="email"
                              value={loginData.email}
                              onChange={handleLoginChange}
                              placeholder="Enter your email"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="loginPassword">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="loginPassword"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              value={loginData.password}
                              onChange={handleLoginChange}
                              placeholder="Enter your password"
                              className="pl-10 pr-10"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="role">Login As</Label>
                          <Select
                            value={loginData.role}
                            onValueChange={(value: "member" | "admin") => 
                              setLoginData(prev => ({ ...prev, role: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="member">
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4" />
                                  <span>Member</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="admin">
                                <div className="flex items-center space-x-2">
                                  <Shield className="h-4 w-4" />
                                  <span>Admin</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Signing In...
                            </>
                          ) : (
                            <>
                              <LogIn className="mr-2 h-4 w-4" />
                              Sign In
                            </>
                          )}
                        </Button>

                        <div className="text-center">
                          <button
                            type="button"
                            className="text-sm text-primary hover:underline"
                          >
                            Forgot your password?
                          </button>
                        </div>
                      </form>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-4">
                      <div className="text-center mb-4">
                        <Badge variant="outline">Member Registration Only</Badge>
                        <p className="text-sm text-muted-foreground mt-2">
                          Admin accounts are created by existing administrators
                        </p>
                      </div>

                      <form onSubmit={handleSignupSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signupName">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signupName"
                              name="fullName"
                              value={signupData.fullName}
                              onChange={handleSignupChange}
                              placeholder="Enter your full name"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signupEmail">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signupEmail"
                              name="email"
                              type="email"
                              value={signupData.email}
                              onChange={handleSignupChange}
                              placeholder="Enter your email"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signupPassword">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signupPassword"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              value={signupData.password}
                              onChange={handleSignupChange}
                              placeholder="Create a password"
                              className="pl-10 pr-10"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Password must be at least 8 characters long
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              value={signupData.confirmPassword}
                              onChange={handleSignupChange}
                              placeholder="Confirm your password"
                              className="pl-10 pr-10"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </button>
                          </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Creating Account...
                            </>
                          ) : (
                            <>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Create Account
                            </>
                          )}
                        </Button>

                        <div className="text-center text-xs text-muted-foreground">
                          By creating an account, you agree to our{" "}
                          <Link to="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

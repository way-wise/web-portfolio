"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye, LogOut, Database } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/ui/image-upload";

interface PortfolioItem {
  _id: string;
  id: string;
  title: string;
  description: string;
  category: string;
  highlightKeyword?: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  completionDate?: string;
  longDescription?: string;
  features?: string[];
  process?: string;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  highlightKeyword: string;
  image: string;
  technologies: string;
  demoUrl: string;
  githubUrl: string;
  completionDate: string;
  longDescription: string;
  features: string;
  process: string;
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "wordpress",
    highlightKeyword: "",
    image: "",
    technologies: "",
    demoUrl: "",
    githubUrl: "",
    completionDate: "",
    longDescription: "",
    features: "",
    process: ""
  });
  const router = useRouter();

  // Check if user is logged in on component mount
  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      setIsLoggedIn(true);
      fetchPortfolioItems();
    }
  }, []);

  /**
   * Handle login form submission
   * @param e - Form event
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminData", JSON.stringify(data.admin));
        setIsLoggedIn(true);
        toast.success("Login successful!");
        fetchPortfolioItems();
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    localStorage.removeItem("adminData");
    setIsLoggedIn(false);
    setPortfolioItems([]);
    toast.success("Logged out successfully");
  };

  /**
   * Fetch all portfolio items from the database
   */
  const fetchPortfolioItems = async () => {
    try {
      const response = await fetch("/api/portfolio");
      const data = await response.json();
      setPortfolioItems(data);
    } catch (error) {
      toast.error("Failed to fetch portfolio items");
    }
  };

  /**
   * Handle database seeding
   */
  const handleSeedDatabase = async () => {
    try {
      const response = await fetch("/api/seed", {
        method: "POST",
      });
      const data = await response.json();
      
      if (response.ok) {
        toast.success(`Database seeded! ${data.portfolioItemsCount} items added. Admin: ${data.adminCredentials.username}/${data.adminCredentials.password}`);
        fetchPortfolioItems();
      } else {
        toast.error(data.error || "Failed to seed database");
      }
    } catch (error) {
      toast.error("Failed to seed database");
    }
  };

  /**
   * Reset form data to initial state
   */
  const resetFormData = () => {
    setFormData({
      title: "",
      description: "",
      category: "wordpress",
      highlightKeyword: "",
      image: "",
      technologies: "",
      demoUrl: "",
      githubUrl: "",
      completionDate: "",
      longDescription: "",
      features: "",
      process: ""
    });
  };

  /**
   * Handle form field changes
   * @param field - Field name
   * @param value - Field value
   */
  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Open create item dialog
   */
  const openCreateDialog = () => {
    resetFormData();
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  /**
   * Open edit item dialog
   * @param item - Portfolio item to edit
   */
  const openEditDialog = (item: PortfolioItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      highlightKeyword: item.highlightKeyword || "",
      image: item.image,
      technologies: item.technologies?.join(", ") || "",
      demoUrl: item.demoUrl || "",
      githubUrl: item.githubUrl || "",
      completionDate: item.completionDate || "",
      longDescription: item.longDescription || "",
      features: item.features?.join(", ") || "",
      process: item.process || ""
    });
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  /**
   * Handle create item form submission
   * @param e - Form event
   */
  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.image) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const itemData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        highlightKeyword: formData.highlightKeyword,
        image: formData.image,
        technologies: formData.technologies ? formData.technologies.split(",").map(t => t.trim()).filter(t => t) : [],
        demoUrl: formData.demoUrl,
        githubUrl: formData.githubUrl,
        completionDate: formData.completionDate,
        longDescription: formData.longDescription,
        features: formData.features ? formData.features.split(",").map(f => f.trim()).filter(f => f) : [],
        process: formData.process,
      };

      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      if (response.ok) {
        toast.success("Portfolio item created successfully!");
        fetchPortfolioItems();
        setIsDialogOpen(false);
        resetFormData();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to create item");
      }
    } catch (error) {
      toast.error("Failed to create portfolio item");
    }
  };

  /**
   * Handle update item form submission
   * @param e - Form event
   */
  const handleUpdateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingItem) return;

    if (!formData.title || !formData.description || !formData.category || !formData.image) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const itemData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        highlightKeyword: formData.highlightKeyword,
        image: formData.image,
        technologies: formData.technologies ? formData.technologies.split(",").map(t => t.trim()).filter(t => t) : [],
        demoUrl: formData.demoUrl,
        githubUrl: formData.githubUrl,
        completionDate: formData.completionDate,
        longDescription: formData.longDescription,
        features: formData.features ? formData.features.split(",").map(f => f.trim()).filter(f => f) : [],
        process: formData.process,
      };

      const response = await fetch(`/api/portfolio/${editingItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      if (response.ok) {
        toast.success("Portfolio item updated successfully!");
        fetchPortfolioItems();
        setEditingItem(null);
        setIsDialogOpen(false);
        resetFormData();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to update item");
      }
    } catch (error) {
      toast.error("Failed to update portfolio item");
    }
  };

  /**
   * Handle delete item
   * @param id - Portfolio item ID
   */
  const handleDeleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Portfolio item deleted successfully!");
        fetchPortfolioItems();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to delete item");
      }
    } catch (error) {
      toast.error("Failed to delete portfolio item");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Quick Setup</h4>
              <p className="text-sm text-blue-700 mb-2">
                Click the button below to seed the database with sample data and create admin credentials.
              </p>
              <Button 
                onClick={handleSeedDatabase} 
                variant="outline" 
                size="sm"
                className="w-full"
              >
                <Database className="w-4 h-4 mr-2" />
                Seed Database
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <Button onClick={() => router.push("/")} variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View Portfolio
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList>
            <TabsTrigger value="portfolio">Portfolio Items</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            {/* Add New Item Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Portfolio Items ({portfolioItems.length})</h2>
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Item
              </Button>
            </div>

            {/* Portfolio Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <Card key={item._id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-200 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.technologies?.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {item.technologies && item.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(item)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Create/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Portfolio Item" : "Add New Portfolio Item"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={editingItem ? handleUpdateItem : handleCreateItem} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input 
                    id="title" 
                    value={formData.title}
                    onChange={(e) => handleFormChange("title", e.target.value)}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleFormChange("category", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wordpress">WordPress</SelectItem>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="wix">Wix</SelectItem>
                      <SelectItem value="webflow">Webflow</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="nocode">No-Code</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  value={formData.description}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="highlightKeyword">Highlight Keyword</Label>
                  <Input 
                    id="highlightKeyword" 
                    value={formData.highlightKeyword}
                    onChange={(e) => handleFormChange("highlightKeyword", e.target.value)}
                  />
                </div>
              </div>
              
              {/* Image Upload Component */}
              <ImageUpload
                value={formData.image}
                onChange={(value) => handleFormChange("image", value)}
                label="Project Image"
                required={true}
              />
              
              <div>
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input 
                  id="technologies" 
                  value={formData.technologies}
                  onChange={(e) => handleFormChange("technologies", e.target.value)}
                  placeholder="React, Node.js, MongoDB" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="demoUrl">Demo URL</Label>
                  <Input 
                    id="demoUrl" 
                    value={formData.demoUrl}
                    onChange={(e) => handleFormChange("demoUrl", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input 
                    id="githubUrl" 
                    value={formData.githubUrl}
                    onChange={(e) => handleFormChange("githubUrl", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="completionDate">Completion Date</Label>
                <Input 
                  id="completionDate" 
                  value={formData.completionDate}
                  onChange={(e) => handleFormChange("completionDate", e.target.value)}
                  placeholder="August 2023" 
                />
              </div>
              <div>
                <Label htmlFor="longDescription">Long Description</Label>
                <Textarea 
                  id="longDescription" 
                  value={formData.longDescription}
                  onChange={(e) => handleFormChange("longDescription", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Textarea 
                  id="features" 
                  value={formData.features}
                  onChange={(e) => handleFormChange("features", e.target.value)}
                  placeholder="Feature 1, Feature 2, Feature 3" 
                />
              </div>
              <div>
                <Label htmlFor="process">Process</Label>
                <Textarea 
                  id="process" 
                  value={formData.process}
                  onChange={(e) => handleFormChange("process", e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingItem(null);
                    resetFormData();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingItem ? "Update Item" : "Create Item"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
} 
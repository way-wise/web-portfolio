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
import { Plus, Edit, Trash2, Eye, LogOut, Database } from "lucide-react";
import { toast } from "sonner";

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

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  // Check if user is logged in on component mount
  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      setIsLoggedIn(true);
      fetchPortfolioItems();
    }
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("adminData");
    setIsLoggedIn(false);
    setPortfolioItems([]);
    toast.success("Logged out successfully");
  };

  const fetchPortfolioItems = async () => {
    try {
      const response = await fetch("/api/portfolio");
      const data = await response.json();
      setPortfolioItems(data);
    } catch (error) {
      toast.error("Failed to fetch portfolio items");
    }
  };

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

  const handleCreateItem = async (formData: FormData) => {
    try {
      const itemData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        highlightKeyword: formData.get("highlightKeyword") as string,
        image: formData.get("image") as string,
        technologies: (formData.get("technologies") as string).split(",").map(t => t.trim()),
        demoUrl: formData.get("demoUrl") as string,
        githubUrl: formData.get("githubUrl") as string,
        completionDate: formData.get("completionDate") as string,
        longDescription: formData.get("longDescription") as string,
        features: (formData.get("features") as string).split(",").map(f => f.trim()),
        process: formData.get("process") as string,
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
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to create item");
      }
    } catch (error) {
      toast.error("Failed to create portfolio item");
    }
  };

  const handleUpdateItem = async (formData: FormData) => {
    if (!editingItem) return;

    try {
      const itemData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        highlightKeyword: formData.get("highlightKeyword") as string,
        image: formData.get("image") as string,
        technologies: (formData.get("technologies") as string).split(",").map(t => t.trim()),
        demoUrl: formData.get("demoUrl") as string,
        githubUrl: formData.get("githubUrl") as string,
        completionDate: formData.get("completionDate") as string,
        longDescription: formData.get("longDescription") as string,
        features: (formData.get("features") as string).split(",").map(f => f.trim()),
        process: formData.get("process") as string,
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
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to update item");
      }
    } catch (error) {
      toast.error("Failed to update portfolio item");
    }
  };

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
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Portfolio Item</DialogTitle>
                  </DialogHeader>
                  <form action={handleCreateItem} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" required />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" name="category" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" name="description" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="highlightKeyword">Highlight Keyword</Label>
                        <Input id="highlightKeyword" name="highlightKeyword" />
                      </div>
                      <div>
                        <Label htmlFor="image">Image Path</Label>
                        <Input id="image" name="image" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                      <Input id="technologies" name="technologies" placeholder="React, Node.js, MongoDB" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="demoUrl">Demo URL</Label>
                        <Input id="demoUrl" name="demoUrl" />
                      </div>
                      <div>
                        <Label htmlFor="githubUrl">GitHub URL</Label>
                        <Input id="githubUrl" name="githubUrl" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="completionDate">Completion Date</Label>
                      <Input id="completionDate" name="completionDate" placeholder="August 2023" />
                    </div>
                    <div>
                      <Label htmlFor="longDescription">Long Description</Label>
                      <Textarea id="longDescription" name="longDescription" />
                    </div>
                    <div>
                      <Label htmlFor="features">Features (comma-separated)</Label>
                      <Textarea id="features" name="features" placeholder="Feature 1, Feature 2, Feature 3" />
                    </div>
                    <div>
                      <Label htmlFor="process">Process</Label>
                      <Textarea id="process" name="process" />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Create Item</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
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
                        onClick={() => {
                          setEditingItem(item);
                          setIsDialogOpen(true);
                        }}
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

        {/* Edit Dialog */}
        {editingItem && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Portfolio Item</DialogTitle>
              </DialogHeader>
              <form action={handleUpdateItem} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-title">Title</Label>
                    <Input id="edit-title" name="title" defaultValue={editingItem.title} required />
                  </div>
                  <div>
                    <Label htmlFor="edit-category">Category</Label>
                    <Input id="edit-category" name="category" defaultValue={editingItem.category} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea id="edit-description" name="description" defaultValue={editingItem.description} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-highlightKeyword">Highlight Keyword</Label>
                    <Input id="edit-highlightKeyword" name="highlightKeyword" defaultValue={editingItem.highlightKeyword} />
                  </div>
                  <div>
                    <Label htmlFor="edit-image">Image Path</Label>
                    <Input id="edit-image" name="image" defaultValue={editingItem.image} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-technologies">Technologies (comma-separated)</Label>
                  <Input id="edit-technologies" name="technologies" defaultValue={editingItem.technologies?.join(", ")} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-demoUrl">Demo URL</Label>
                    <Input id="edit-demoUrl" name="demoUrl" defaultValue={editingItem.demoUrl} />
                  </div>
                  <div>
                    <Label htmlFor="edit-githubUrl">GitHub URL</Label>
                    <Input id="edit-githubUrl" name="githubUrl" defaultValue={editingItem.githubUrl} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-completionDate">Completion Date</Label>
                  <Input id="edit-completionDate" name="completionDate" defaultValue={editingItem.completionDate} />
                </div>
                <div>
                  <Label htmlFor="edit-longDescription">Long Description</Label>
                  <Textarea id="edit-longDescription" name="longDescription" defaultValue={editingItem.longDescription} />
                </div>
                <div>
                  <Label htmlFor="edit-features">Features (comma-separated)</Label>
                  <Textarea id="edit-features" name="features" defaultValue={editingItem.features?.join(", ")} />
                </div>
                <div>
                  <Label htmlFor="edit-process">Process</Label>
                  <Textarea id="edit-process" name="process" defaultValue={editingItem.process} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => {
                    setEditingItem(null);
                    setIsDialogOpen(false);
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit">Update Item</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  );
} 
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, ExternalLink, Github, Layers, Tag } from "lucide-react"
import { portfolioItems, type PortfolioItem } from "@/lib/portfolio-data"

export default function ProjectDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<PortfolioItem | null>(null)
  const [relatedProjects, setRelatedProjects] = useState<PortfolioItem[]>([])

  useEffect(() => {
    // Find the project with the matching ID
    const foundProject = portfolioItems.find((item) => item.id === params.id)

    if (foundProject) {
      setProject(foundProject)

      // Find related projects (same category, excluding current project)
      const related = portfolioItems
        .filter((item) => item.category === foundProject.category && item.id !== foundProject.id)
        .slice(0, 3) // Limit to 3 related projects

      setRelatedProjects(related)
    } else {
      // If project not found, redirect to home page
      router.push("/")
    }
  }, [params.id, router])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading project details...</div>
      </div>
    )
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "backend":
        return "bg-gradient-to-r from-emerald-400 to-teal-600"
      case "mobile":
        return "bg-gradient-to-r from-purple-400 to-indigo-600"
      case "frontend":
        return "bg-gradient-to-r from-rose-400 to-pink-600"
      case "nocode":
        return "bg-gradient-to-r from-amber-400 to-orange-600"
      case "api":
        return "bg-gradient-to-r from-cyan-400 to-blue-600"
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600"
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Project Image */}
      <div className={`${getCategoryColor(project.category)} text-white`}>
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-full md:w-1/2">
              <Link href="/" className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h1>
              <div className="flex items-center mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                  <Tag className="mr-1 h-4 w-4" />
                  {project.category}
                </span>
              </div>
              <p className="text-lg md:text-xl text-white/90 mb-8">{project.description}</p>

              <div className="flex flex-wrap gap-3 mb-8">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    View Live Demo
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gray-900 text-white hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    View Source Code
                  </a>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                This {project.category} project demonstrates expertise in {project.technologies.join(", ")}.
                {project.longDescription ||
                  `The ${project.title} was designed to provide a robust solution 
                that meets modern development standards and user expectations.`}
              </p>

              <h3>Key Features</h3>
              <ul>
                <li>Feature-rich {project.category} implementation</li>
                <li>Built with {project.technologies.slice(0, 2).join(" and ")}</li>
                <li>Responsive and user-friendly design</li>
                <li>Optimized for performance and scalability</li>
                {project.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <h3>Development Process</h3>
              <p>
                The development of this project involved careful planning and implementation to ensure that all
                requirements were met while maintaining code quality and performance.
                {project.process || ""}
              </p>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Project Details</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Completion Date</p>
                    <p className="text-gray-600">{project.completionDate || "2023"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Layers className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Project Type</p>
                    <p className="text-gray-600 capitalize">{project.category}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Tag className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Technologies</p>
                    <p className="text-gray-600">{project.technologies.join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-10 text-center">Related Projects</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/project/${relatedProject.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedProject.image || "/placeholder.svg"}
                      alt={relatedProject.title}
                      fill
                      className="object-cover"
                    />
                    <span
                      className={`absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(relatedProject.category)}`}
                    >
                      {relatedProject.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{relatedProject.title}</h3>
                    <p className="text-gray-600 line-clamp-2">{relatedProject.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

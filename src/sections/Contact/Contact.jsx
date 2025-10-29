// ...existing code...
function Contact() {
  // Reemplaza estas URLs por las tuyas
  const LINKEDIN_URL = "https://www.linkedin.com/in/tu-usuario"
  const GITHUB_URL = "https://github.com/tu-usuario"

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Contacto</h2>
        <div className="flex items-center justify-center gap-6">
          {/* LinkedIn */}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0A66C2] text-white hover:bg-[#084d96] transition"
          >
            {/* Icono LinkedIn (SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.942v5.664H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.368-1.852 3.6 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128zM7.114 20.452H3.556V9h3.558v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          {/* GitHub */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:bg-gray-900 transition"
          >
            {/* Icono GitHub (SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 .5C5.73.5.999 5.23.999 11.5c0 4.854 3.152 8.965 7.523 10.412.55.101.752-.239.752-.53 0-.262-.01-1.131-.016-2.053-3.06.665-3.706-1.299-3.706-1.299-.501-1.272-1.224-1.611-1.224-1.611-.999-.683.076-.669.076-.669 1.105.078 1.686 1.134 1.686 1.134.982 1.682 2.576 1.196 3.205.915.101-.711.384-1.196.698-1.472-2.441-.278-5.007-1.22-5.007-5.43 0-1.198.427-2.177 1.128-2.946-.113-.277-.49-1.396.107-2.909 0 0 .924-.296 3.03 1.126A10.54 10.54 0 0 1 12 6.82c.936.004 1.878.127 2.758.372 2.105-1.422 3.028-1.126 3.028-1.126.599 1.513.222 2.632.11 2.909.702.769 1.127 1.748 1.127 2.946 0 4.221-2.57 5.148-5.018 5.422.395.34.747 1.01.747 2.038 0 1.471-.013 2.656-.013 3.017 0 .294.2.637.759.528C19.853 20.461 23 16.353 23 11.5 23 5.23 18.27.5 12 .5z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
// ...existing code...
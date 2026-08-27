import { Link } from "react-router-dom";
import { Phone, Download, ArrowRight, Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section id="home" className="min-h-[82vh] flex items-center">
          <div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sky-600 font-semibold">HELLO, I'M</p>
              <h1 className="text-5xl md:text-6xl font-bold mt-2">
                Shankar ST
              </h1>
              <h2 className="text-2xl mt-5 font-semibold">
                Welcome to My Portfolio
              </h2>
              <p className="mt-5 text-gray-700 leading-8">
                I'm a developer and learner who enjoys building useful web
                applications, learning new technologies, and sharing what I
                learn through my blog.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/login"
                  className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
                >
                  Read My Blogs <ArrowRight size={18} />
                </Link>
                <a
                  href="#about"
                  className="border-2 border-sky-500 px-6 py-3 rounded-xl font-semibold"
                >
                  About Me
                </a>
              </div>
            </div>

            <div className="bg-sky-100 rounded-3xl p-5 min-h-[500px] flex items-center justify-center">
              <img
                src="/images/profile.jpeg"
                alt="Shankar ST"
                className="w-full max-h-[500px] object-cover rounded-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling.style.display = "block";
                }}
              />
            </div>
          </div>
        </section>

        <section id="about" className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-5">
            <h2 className="text-4xl font-bold">About Me</h2>
            <p className="mt-5 leading-8 text-gray-700">
              Dedicated and results-oriented professional with over 6 years of
              experience in SQL Testing, QA Engineering, andProduction Support
              across the Retail, Fintech, and Banking sectors. Throughout my
              career at Tata ConsultancyServices(TCS) and IVAAN Technologies, I
              have delivered high-quality technical solutions for global clients
              including WoolworthsGroup, PayPal, and Barclays. My expertise lies
              in executing complex SQL queries and data validation
              withinGoogleBigQuery, managing automated production workflows
              using Control-M and UC4, and optimizing GCP cloudinfrastructure.I
              am highly proficient in the full STLC (Software Testing Life
              Cycle), from developing comprehensive test plans
              todefectmanagement in JIRA and qTest. With a strong foundation in
              Oracle PL/SQL development and performancetuning, I havea proven
              track record of performing Root Cause Analysis (RCA) and
              maintaining 24/7 systemreliability for critical business
              applications.
              <br></br>
              <br></br>
              Currently I am pursuing a Full Stack Web-Development course to
              upgrade my skills and to begin my developer jouney!
              <br></br>
              <br></br>
              Lookout my projects at     
              <a
                  href="https://nova-verse-app.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                 NovaVerse App
                </a> .
            </p>

            <a
              href="/documents/Shankar_ST_Resume.pdf"
              download="Shankar_ST_Resume.pdf"
              className="inline-flex items-center gap-2 mt-7 bg-yellow-400 hover:bg-yellow-500 px-5 py-3 rounded-xl font-semibold"
            >
              <Download size={18} /> Download My CV
            </a>
          </div>
        </section>

        <section id="contact" className="bg-sky-100 py-20">
          <div className="max-w-5xl mx-auto px-5">
            <h2 className="text-4xl font-bold">Contact</h2>
            <p className="mt-4">I'd be happy to connect with you.</p>

            <p className="mt-6 flex items-center gap-2">
              <Phone size={18} />
              Mobile: <strong>+91-6369565963</strong>
            </p>

            <p className="mt-6 flex items-center gap-2">
              <Phone size={18} />
              Alternate Mobile: <strong>+91-9524870050</strong>
            </p>

            <p className="mt-6 flex items-center gap-2">
              <Mail size={18} />
              E-Mail: <strong>shankargowtham95@gmail.com</strong>
            </p>

            <p className="mt-6 flex items-center gap-2">
              <FaLinkedin size={20} />
              <span>
                LinkedIn:
                <a
                  href="https://www.linkedin.com/in/shankar-st-b857091a1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 hover:underline"
                >
                  https://www.linkedin.com/in/shankar-st-b857091a1/
                </a>
              </span>
            </p>

          </div>
        </section>
      </main>
    </>
  );
}

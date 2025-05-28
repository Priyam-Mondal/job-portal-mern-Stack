import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function Jobs() {
  // The 'jobsArr' is static and not used in the component's rendering
  // It seems to be a placeholder or example.
  const jobsArr = [
    {
      id: 1,
      company: {
        name: "Tech Innovations",
        logoUrl: "https://example.com/logos/tech-innovations.png",
      },
    },
    {
      id: 2,
      company: {
        name: "Global Solutions",
        logoUrl: "https://example.com/logos/global-solutions.png",
      },
    },
    {
      id: 3,
      company: { name: "Acme Corp", logoUrl: "https://via.placeholder.com/50" },
    },
    {
      id: 4,
      company: {
        name: "Beta Industries",
        logoUrl: "https://via.placeholder.com/60/FF0000",
      },
    },
    {
      id: 5,
      company: {
        name: "Gamma Ltd",
        logoUrl: "https://via.placeholder.com/70/00FF00/FFFFFF?Text=GL",
      },
    },
    {
      id: 6,
      company: {
        name: "Delta Systems",
        logoUrl: "https://via.placeholder.com/80/0000FF",
      },
    },
    {
      id: 7,
      company: {
        name: "Epsilon Group",
        logoUrl: "https://via.placeholder.com/90",
      },
    },
    {
      id: 8,
      company: {
        name: "Zeta Inc",
        logoUrl: "https://via.placeholder.com/100/FFFF00",
      },
    },
    {
      id: 9,
      company: {
        name: "Omega Solutions",
        logoUrl: "https://via.placeholder.com/110/00FFFF",
      },
    },
    {
      id: 10,
      company: {
        name: "Sigma Corp",
        logoUrl: "https://via.placeholder.com/120",
      },
    },
  ];

  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        // Ensure job properties exist before calling .toLowerCase()
        const title = job.title?.toLowerCase() || "";
        const description = job.description?.toLowerCase() || "";
        const location = job.location?.toLowerCase() || "";
        const query = searchedQuery.toLowerCase();

        return (
          title.includes(query) ||
          description.includes(query) ||
          location.includes(query)
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gray-100">
      {" "}
      {/* Added a light gray background to the entire page */}
      <Navbar />
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Increased top margin and added horizontal padding */}
        <div className="flex flex-col md:flex-row gap-6">
          {" "}
          {/* Changed to flex-col on small screens, flex-row on md and up, increased gap */}
          <div className="md:w-1/4 w-full">
            {" "}
            {/* Adjusted width for filter card, full width on small screens */}
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <div className="flex-1 flex justify-center items-center h-[70vh] bg-white rounded-lg shadow-md">
              {" "}
              {/* Centered message, added background and shadow */}
              <span className="text-xl font-semibold text-gray-600">
                No jobs found matching your criteria.
              </span>{" "}
              {/* Styled message */}
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 pr-2 custom-scrollbar">
              {" "}
              {/* Added custom scrollbar class and right padding */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {" "}
                {/* Responsive grid columns, increased gap */}
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }} // Changed initial animation
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }} // Changed exit animation
                    transition={{ duration: 0.4 }} // Slightly faster transition
                    key={job?._id}
                    className="transform hover:scale-[1.02] transition-transform duration-200 ease-in-out" // Added subtle hover effect
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;

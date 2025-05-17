import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function Jobs() {
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
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>

          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    key={job?._id}
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

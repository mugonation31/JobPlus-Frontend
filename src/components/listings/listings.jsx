import React, { useState, useEffect } from "react";
import "./listings.scss";
import Paginate from "../paginate/paginate";
import { StarSaved, StarUnSaved, Money, Location, Timer } from "../images";

import { Fragment } from "react";
import ConfirmationModal from "../confirmation_modal/confirmation_modal";
import jobService from "../../services/JobService";

const MAX_CHAR_LENGTH = 200;

export default function listings() {
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToSave, setJobToSave] = useState(null);

  const { fetchJobs } = jobService();

  const handleSuccess = (res) => {
    const { entries, meta } = res.data;

    // update each job to include isTruncated (is shorter)
    const updatedJobs = entries.map((job) => ({
      ...job,
      isTruncated: true,
    }));

    setJobs(updatedJobs);
    setMeta(meta);
  };

  const truncate = (text, jobId) => {
    const job = jobs.find((job) => job.id === jobId);

    const shouldTruncate = text.length > MAX_CHAR_LENGTH && job?.isTruncated;
    if (!shouldTruncate) return text;

    const truncated = text.slice(0, MAX_CHAR_LENGTH);
    // return elipsis if text is truncated
    return truncated + "...";
  };

  const toggleTruncate = (jobId) => {
    const updatedJobs = jobs.map((job) => {
      if (job.id === jobId) {
        return { ...job, isTruncated: !job.isTruncated };
      }

      return job;
    });

    setJobs(updatedJobs);
  };

  useEffect(() => {
    const page = 1;
    fetchJobs(page, handleSuccess);
  }, []);

  const showModal = (job) => {
    setJobToSave(job);
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const acceptModal = () => {
    console.log("this is saving the job:", jobToSave);
    hideModal();
  };

  const handlePageChange = (pageNumber) => {
    fetchJobs(pageNumber, handleSuccess);
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={hideModal}
        onAccept={acceptModal}
        text="You are about to save this job. Are you sure?"
      />
      <section>
        {jobs.map((job) => (
          <div key={job.id} className="listing__card">
            <header className="listing__header">
              <h1 className="listing__title">{job.title}</h1>
              <img
                className="listing__saved"
                src={StarUnSaved}
                style={{ cursor: "pointer" }}
                alt="star"
                onClick={() => showModal(job)}
              />
              <p className="listing__company">
                Posted by <span>{job.company.name}</span>
              </p>
            </header>
            <ul className="listing__items">
              <li>
                <img src={Money} alt="" />
                <b>Salary {job.SalaryType}</b>
              </li>
              <li>
                <img src={Location} alt="" />
                <b>{job.location}</b>
              </li>
              <li>
                <img src={Timer} alt="" />
                {job.job_types.map((type, index, array) => (
                  <Fragment key={type.id}>
                    <span>{type.title}</span>
                    {index !== array.length - 1 && <span>,</span>}
                  </Fragment>
                ))}
              </li>
            </ul>

            <p className="listing__detail">
              {truncate(job.description, job.id)}
              <a onClick={() => toggleTruncate(job.id)}>
                <b>{job.isTruncated ? "Read more" : "Read less"}</b>
              </a>
            </p>

            <a href="" className="listing__cta">
              Withdraw application
            </a>
          </div>
        ))}
        <Paginate meta={meta.paginate} onPageChange={handlePageChange} />
      </section>
    </>
  );
}

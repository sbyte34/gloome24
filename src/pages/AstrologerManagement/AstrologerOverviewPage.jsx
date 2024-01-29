import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import EditMenu from '../../components/DropdownEditMenu';
import AddAstrologer from './AddAstrologer';

const AstrologerOverviewPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M2NGRjMGU3MWYxYzVmNGUwM2RiMSIsImVtYWlsIjoid2FzZWVtQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNjM5NTkzN30.I6r1MUn358bQGYHr46PEuCMSxw8PL-psN5Pn0lT69uQ"; // Replace with your actual bearer token

  const fetchDataFromApi = async () => {
    try {
      const result = await axios.get("http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/astrologer/getallAstrologers");
      setData(result.data.payload);
      console.log(result.data.payload);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDelete = async (astrologerId) => {
    try {
      const result = await axios.post("http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/admin/deleteAstrologerProfile", {
        astrologerID: astrologerId,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      console.log(result);
      fetchDataFromApi();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlock = async (astrologerId, isBlocked) => {
    console.log(`Blocking astrologer with ID: ${astrologerId}`);
    try {
      const result = await axios.post("http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/admin/block", {
        userType: "Astrologer",
        _id: astrologerId,
        block: !isBlocked,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      console.log(result);
      fetchDataFromApi();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKyc = async (astrologerId, isKyc) => {
    console.log(`KYC astrologer with ID: ${astrologerId}`);
    try {
      const result = await axios.post("http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/admin/changeKycStatus", {
        astrologerID: astrologerId,
        status: !isKyc,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      console.log(result);
      fetchDataFromApi();
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={openModal}>
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Astrologer</span>
                </button>
              </div>
            </div>

            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">All Astrologers</h2>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full dark:text-slate-300">
                    <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th className="p-2">
                          <div className="font-semibold text-center">Name</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Email</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Phone Number</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Specialization</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Onboarded At</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">KYC Status</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Action</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                      {data.map((astrologer, index) => (
                        <tr key={index}>
                          <td className="p-2">
                            <div className="text-center">{astrologer.data.name}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{astrologer.data.email}</div>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center">
                              <div className="text-slate-800 dark:text-slate-100">{astrologer.data.phone_number}</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{astrologer.data.specialization}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{astrologer.data.createdAt.slice(0, 10)}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {astrologer.data.kyc ? (
                                <span className="text-green-500">Approved</span>
                              ) : (
                                <span className="text-red-500">Rejected</span>
                              )}
                            </div>
                          </td>
                          <td className="p-2" align="center">
                            <EditMenu align="right" className="relative inline-flex">
                              <li>
                                <Link
                                  className="font-medium text-sm text-blue-500 hover:text-blue-700 flex py-1 px-3"
                                  to="#0"
                                >
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <Link
                                  onClick={() => handleBlock(astrologer.data._id, astrologer.data.block)}
                                  className={`font-medium text-sm ${astrologer.data.block ? 'text-green-500' : 'text-red-500'} hover:text-rose-600 flex py-1 px-3`}
                                  to="#0"
                                >
                                  {astrologer.data.block ? 'Unblock' : 'Block'}
                                </Link>
                              </li>
                              <li>
                                <Link
                                  onClick={() => handleKyc(astrologer.data._id, astrologer.data.kyc)}
                                  className="font-medium text-sm text-purple-500 hover:text-purple-700 flex py-1 px-3"
                                  to="#0"
                                >
                                  Update KYC
                                </Link>
                              </li>
                              <li>
                                <Link
                                  onClick={() => handleDelete(astrologer.data._id)}
                                  className="font-medium text-sm text-red-500 hover:text-red-700 flex py-1 px-3"
                                  to="#0"
                                >
                                  Delete
                                </Link>
                              </li>
                            </EditMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <AddAstrologer closeModal={closeModal} fetchDataFromApi={fetchDataFromApi} accessToken={accessToken} />
        </div>
      )}
    </div>
  );
};

export default AstrologerOverviewPage;

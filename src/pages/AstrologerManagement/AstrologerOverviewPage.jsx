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

  const accessToken = "YOUR_ACCESS_TOKEN"; // Replace with your actual bearer token

  const fetchDataFromApi = async () => {
    try {
      const result = await axios.get("http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/getAllvendors");
      setData(result.data);
      console.log(result.data);
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

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* ... other code ... */}
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">All Partners</h2>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full dark:text-slate-300">
                    <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                    <tr>
                        <th className="p-2">
                          <div className="font-semibold text-center">First_name</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Last_name</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Email</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Phone Number</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Gender</div>
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
                      </tr>                    </thead>
                    <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                      {data.map((astrologer) => (
                        <tr key={astrologer._id}>
                          <td className="p-2">
                            <div className="text-center">{astrologer.First_name}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{astrologer.Last_name}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{astrologer.Email}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{astrologer.phone_number}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{astrologer.Gender}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{astrologer.createdAt}</div>
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
    </div>
  );
};

export default AstrologerOverviewPage;

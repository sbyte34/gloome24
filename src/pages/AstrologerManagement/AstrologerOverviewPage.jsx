import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Modal from 'react-modal';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import FilterButton from '../../components/DropdownFilter';
import Datepicker from '../../components/Datepicker';
import { fetchData } from './AstrologerApi';
import axios from 'axios';
import AddPage from './AddPage';
import EditAstrologerData from './EditAstrologerData';
import CreateAstrologer from './CreateAstrologer';
import EditMenu from '../../components/DropdownEditMenu';
import SupportTickets from './supportsTicketsAst';
import AddAstrologer from './AddAstrologer';


const AstrologerOverviewPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [isEditable, setIsEditable] = useState(false)
    const [editableData, setEditableData] = useState(undefined)
    // State for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const result = await axios.get("http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/astrologer/getallAstrologers"); // Replace with your actual API endpoint
                setData(result.data.payload);

                console.log(result.data.payload);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDataFromApi();
    }, []); // The empty dependency array ensures the effect runs only once, similar to componentDidMount

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const handleDropdownToggle = (userId) => {
        setOpenDropdownId((prevId) => (prevId === userId ? null : userId));
    };
    const handleEdit = (userId) => {
        // Implement edit logic here
        setOpenDropdownId(null)
        setEditableData(userId)
        setIsEditable(true)
        
    };

    const handleDelete = (userId) => {
        // Implement delete logic here
        console.log(`Deleting user with ID: ${userId}`);
    };

    const handleDisplay = (userId) => {
        // Implement display logic here
        console.log(`Displaying details for user with ID: ${userId}`);
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {isEditable ? (
                <Modal
                isOpen={isEditable}
                onRequestClose={closeModal}
                contentLabel="Edit Astrologer Page Modal"
                className="modal" // Use the custom modal class
                overlayClassName="modal-overlay"
            >
                <EditAstrologerData editableData={editableData} modalClose={() => setIsEditable(false)}/>
            </Modal>
            ) : null}
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        {/* Dashboard actions */}
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">
                            {/* Right: Actions */}
                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                                {/* Filter button */}
                                <FilterButton />
                                {/* Datepicker built with flatpickr */}
                                <Datepicker />
                                {/* Add view button */}
                                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={openModal}>
                                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                    </svg>
                                    <span className="hidden xs:block ml-2">Add view</span>
                                </button>
                            </div>
                        </div>
                        {/* Your add page modal */}
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            contentLabel="Add Page Modal"
                            className="modal" // Use the custom modal class
                            overlayClassName="modal-overlay"
                        >
                            <AddAstrologer closeModal={closeModal} />
                        </Modal>
                        <Routes>
                            <Route path="/add" element={<AddAstrologer />} />
                        </Routes>            {/* Cards */}

                        <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                                <h2 className="font-semibold text-slate-800 dark:text-slate-100">All Astrologers</h2>
                            </header>
                            <div className="p-3">
                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full dark:text-slate-300">
                                        {/* Table header */}
                                        <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                                            <tr>
                                                <th className="p-2">
                                                    <div className="font-semibold text-left">Email</div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Name</div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Phone Number</div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">specialization</div>
                                                </th>
                                                
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">YearsOfExperience
                                                    </div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Rating
                                                    </div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">biography
                                                    </div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">createdAt
                                                    </div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">updatedAt
                                                    </div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Actions
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        {/* Table body */}
                                        <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                                            {/* Rows dynamically generated based on data */}
                                            {data.map((user, index) => (
                                                <tr key={index}>
                                                <td className="p-2">
                                                    <div className="flex items-center">
                                                        <div className="text-slate-800 dark:text-slate-100">{user.data.email}</div>
                                                    </div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-center">{user.data.name}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-center">{user.data.phone_number}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-center">{user.data.specialization}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-center">{user.data.YearsOfExperience}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-center">{user.data.Rating}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-center">{user.data.bio}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-center">{user.data.createdAt}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-center">{user.data.updatedAt}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="flex justify-center space-x-2">
                                                        {/* Your other actions here */}
                                                    </div>
                                                </td>
                                                    <td className="p-2">
                                                        <div className="flex justify-center space-x-2">
                                                            <div className="cursor-pointer" onClick={() => handleDropdownToggle(user._id)}>
                                                                {/* <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    className="h-5 w-5"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                                    />
                                                                </svg> */}
                                                                                                                           <EditMenu align="right" className="relative inline-flex">
    <li>
      <Link onClick={() => handleDisplay(user._id)} className="font-medium text-sm text-green-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3" to="#0">
        Display
      </Link>
    </li>
    <li>
      <Link onClick={() => handleEdit(user)} className="font-medium text-sm text-indigo-600 hover:text-rose-600 flex py-1 px-3" to="#0">
        Edit
      </Link>
    </li>
    <li>
      <Link onClick={() => handleDelete(user._id)} className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">
        Delete
      </Link>
    </li>
  </EditMenu>
                                                            </div>
                                                            {/* {openDropdownId === user._id && (
                                                                <div className="flex flex-col absolute bg-white dark:bg-slate-800 border dark:border-slate-700 mt-2 space-y-2 p-2">
                                                                    <button
                                                                        onClick={() => handleEdit(user)}
                                                                        className="text-indigo-600 hover:underline focus:outline-none"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(user._id)}
                                                                        className="text-red-600 hover:underline focus:outline-none"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDisplay(user._id)}
                                                                        className="text-green-600 hover:underline focus:outline-none"
                                                                    >
                                                                        Display
                                                                    </button>
                                                                </div>
                                                            )} */}
                                                        </div>
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
    )
}

export default AstrologerOverviewPage

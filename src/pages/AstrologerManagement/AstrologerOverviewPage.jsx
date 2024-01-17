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
                    <EditAstrologerData editableData={editableData} modalClose={() => setIsEditable(false)} />
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
                                                    <div className="font-semibold text-center">Phone Number</div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Name</div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Email</div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">specialization</div>
                                                </th>

                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Experience
                                                    </div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Rating
                                                    </div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">createdAt
                                                    </div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">KYC Status
                                                    </div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Bank Details
                                                    </div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Block
                                                    </div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Edit
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
                                                            <div className="text-slate-800 dark:text-slate-100">{user.data.phone_number}</div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-center">{user.data.name}</div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-center">{user.data.email}</div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-center">{user.data.specialization}</div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-center">{user.data.YearsOfExperience}</div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-center">{user.data.avgRating}</div>
                                                    </td>
                                                    <td className="p-2">
                                                        {/* <div className="text-center">{user.data.createdAt}</div> */}
                                                        <div className="text-center">{user.data.createdAt.slice(0, 10)}</div>
                                                    </td>
                                                    <td className="p-2">
                                                        {/* kyc value is boolean */}
                                                        <div className="text-center">
                                                            {user.data.kyc ? (
                                                                <span className="text-green-500">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="green">
                                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 18 21 6l-1.41-1.41L9 16.17z" />
                                                                    </svg>

                                                                </span>
                                                            ) : (
                                                                <span className="text-red-500">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="red">
    <path d="M6.71 5.29L12 10.59l5.29-5.3 1.41 1.41L13.41 12l5.3 5.29-1.41 1.41L12 13.41l-5.29 5.3-1.41-1.41L10.59 12 5.29 6.71 6.7 5.3z"/>
</svg>

                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-center">{user.data.bankdetails}</div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-center">{user.data.block}</div>
                                                    </td>
                                                    <td>
                                                        <div className="text-center" onClick={handleEdit}></div>
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

export default AstrologerOverviewPage;

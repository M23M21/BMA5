import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PrivateRoute from '../../components/PrivateRoute';
import BusinessTeamMembers from '@/components/Admin/BusinessTeamMembers';
import { db } from '../../utils/firebase';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const AdminTeamMembersPage = () => {
  const [businessId, setBusinessId] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchBusinessId = async () => {
      const user = auth.currentUser;
      if (user) {
     
        const businessQuery = query(collection(db, 'businesses'), where('userId', '==', user.uid));
        const businessSnapshot = await getDocs(businessQuery);

        if (!businessSnapshot.empty) {
          const businessDoc = businessSnapshot.docs[0];
          setBusinessId(businessDoc.id); 
          console.log('Fetched business ID:', businessDoc.id);
        } else {
          console.error('No business found for the current user.');
        }
      } else {
        console.error('User not authenticated.');
      }
    };

    fetchBusinessId();
  }, [auth]);

  if (!businessId) {
    return <div>Loading business data...</div>; 
  }

  return (
    <PrivateRoute role="admin">
      <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 bg-custom-purple text-white shadow-2xl p-8 flex flex-col justify-start">
          <h1 className="text-3xl font-bold text-center mb-8">Business Owner Sidebar</h1>
          <div className="grid grid-cols-1 gap-4">
            <Link href="/admin">
              <div className="group cursor-pointer rounded-lg border-2 border-white bg-custom-purple p-6 transition-colors hover:bg-purple-700 hover:shadow-lg">
                <h2 className="mb-3 text-2xl font-semibold text-white text-center">
                  Business Owner Home →
                </h2>
                <p className="m-0 text-sm text-gray-200 text-center">Business Owner Home page.</p>
              </div>
            </Link>
            <Link href="/admin/manage-business">
              <div className="group cursor-pointer rounded-lg border-2 border-white bg-custom-purple p-6 transition-colors hover:bg-purple-700 hover:shadow-lg">
                <h2 className="mb-3 text-2xl font-semibold text-white text-center">
                  Manage Business Details →
                </h2>
                <p className="m-0 text-sm text-gray-200 text-center">Overview Business Details.</p>
              </div>
            </Link>
            <Link href="/admin/manage-team-members">
              <div className="group cursor-pointer rounded-lg border-2 border-white bg-custom-purple p-6 transition-colors hover:bg-purple-700 hover:shadow-lg">
                <h2 className="mb-3 text-2xl font-semibold text-white text-center">
                  Manage Team Members →
                </h2>
                <p className="m-0 text-sm text-gray-200 text-center">Manage Team Members Availability.</p>
              </div>
            </Link>
            <Link href="/admin/manage-appointments">
              <div className="group cursor-pointer rounded-lg border-2 border-white bg-custom-purple p-6 transition-colors hover:bg-purple-700 hover:shadow-lg">
                <h2 className="mb-3 text-2xl font-semibold text-white text-center">
                  Manage Appointments →
                </h2>
                <p className="m-0 text-sm text-gray-200 text-center">Manage all appointments for the business.</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-3/4 p-8 flex flex-col items-start justify-start">
          <div className="bg-white shadow-2xl rounded-lg p-8 w-full">
            <BusinessTeamMembers businessId={businessId} /> {/* Correctly passing businessId */}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AdminTeamMembersPage;

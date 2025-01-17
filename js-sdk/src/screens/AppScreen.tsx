"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useFetchSingleApp from "@/hooks/useFetchSingleApp";
import { apiActions } from "@/utils/apiActions";
import InfoCard from "@/components/ui/InfoCard";
import useCobalt from "@/hooks/useCobalt";
import Modal from "@/components/ui/Modal";
import Config from "@/components/Config";
import AuthForm from "@/components/AuthForm";
import AppInfo from "@/components/AppInfo";

const AppScreen = () => {
  const { cobalt } = useCobalt();
  const params = useParams();
  const slug = params.slug!;

  const { app, loading, error } = useFetchSingleApp(slug[0]);
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onConnect = () => {
    setIsConnected(true)
    setIsModalOpen(false)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (app && app.connected) setIsConnected(true)
  }, [app])

  if (loading) {
    return <div>Loading app details...</div>;
  }

  if (error) {
    return <div>Some error occurred while fetching the app..</div>;
  }

  return (
    <>
      {app ? (
        <div className="gap-4 mt-4">
          {/* App Details Card */}
          <div className="flex flex-col bg-white shadow-md rounded-lg p-3 border items-center">
            <AppInfo app={app} />
            <div className="flex w-full ml-6 items-center space-x-4">
              {isConnected && (
                <>
                  <p className="text-green-500 font-semibold">Connected</p>
                </>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-200 text-blue-800 py-1 px-2 rounded-lg shadow-md"
              >
                Configure
              </button>
            </div>
          </div>

          {/* API Info Cards */}
          <div className="fixed bottom-8 right-8 border border-black rounded-lg">
            {apiActions && apiActions[1] && <InfoCard method={apiActions[1]} />}
            {apiActions && apiActions[2] && <InfoCard method={apiActions[2]} />}
            {apiActions && apiActions[3] && <InfoCard method={apiActions[3]} />}
            {apiActions && apiActions[4] && <InfoCard method={apiActions[4]} />}
            {apiActions && apiActions[5] && <InfoCard method={apiActions[5]} />}
          </div>

          {/* Auth/Config Modal */}
          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              {/* App Image and Description */}
              <AppInfo app={app} />
              <div className="border-t my-4"></div>
              {
                app?.connected && !app.reauth_required ?
                  // When App is connected, show config
                  <Config
                    cobalt={cobalt!}
                    app={app}
                    setIsConnected={setIsConnected}
                    closeModal={closeModal}
                  /> :
                  // Show Fields required to authenticate the user
                  <AuthForm
                    app={app}
                    cobalt={cobalt!}
                    onConnect={onConnect}
                  />
              }
            </Modal>
          )}
        </div>
      ) : (
        <div className="text-center mt-8 text-gray-500">
          No app data available.
        </div>
      )}

    </>
  );
};

export default AppScreen;

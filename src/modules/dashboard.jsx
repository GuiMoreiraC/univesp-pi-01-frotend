import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

// Profile component
function ProfileHeader() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch(`${API_BASE}/user/profile`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  return (
    <div className="flex px-72 items-center space-x-4 p-6 bg-gray-100">
      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl">
        {profile.name?.charAt(0) || "A"}
      </div>
      <div>
        <h1 className="text-2xl font-semibold">
          Hello, {profile.name || "Admin"}
        </h1>
        <p className="text-gray-600">Membro desde {profile.memberSince}</p>
      </div>
    </div>
  );
}

// Overview cards component
function OverviewCards() {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/dashboard/overview`)
      .then((res) => res.json())
      .then((data) => setOverview(data));
  }, []);

  if (!overview) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 3v18h18" />
          </svg>
          <span className="font-medium">Series</span>
        </div>
        <h2 className="mt-2 text-3xl font-bold">{overview.series.totalTime}</h2>
        <p className="mt-1 text-gray-500">
          {overview.series.episodesWatched} episódios ({overview.series.plays}{" "}
          plays em {overview.series.seriesCount} séries)
        </p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Series finalizadas</span>
        </div>
        <h2 className="mt-2 text-3xl font-bold">
          {overview.series.finishedCount}
        </h2>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 3h18v18H3z" />
          </svg>
          <span className="font-medium">Filmes</span>
        </div>
        <h2 className="mt-2 text-3xl font-bold">{overview.movies.totalTime}</h2>
        <p className="mt-1 text-gray-500">
          {overview.movies.moviesCount} filmes ({overview.movies.plays} plays)
        </p>
      </div>
    </div>
  );
}

// Recent items component
function RecentGrid() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/dashboard/recent`)
      .then((res) => res.json())
      .then((data) => setRecent(data));
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 p-6">
      {recent.map((item, idx) => (
        <div key={idx} className="bg-white rounded shadow overflow-hidden">
          <div className="relative">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-80 object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-1 flex justify-between items-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M15 10l-4 2 4 2V10z" />
              </svg>
              <span className="text-xs text-white">{item.progress}%</span>
            </div>
          </div>
          <div className="p-2 text-center">
            <p className="font-semibold">
              {item.season}×{item.episode} {item.title}
            </p>
            <p className="text-sm text-gray-500">{item.seriesName}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Main Page Component
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader />
      <div className="justify-center px-60">
        <OverviewCards />
        <RecentGrid />
      </div>
    </div>
  );
}

// shared_data.js
// MindShield
//
// Created by Ulrik Lyngs on 10/06/2025.

// Shared list of platforms the extension has specific toggles for.
const platformsWeTarget = ["youtube"];

// List of specific Google domains to target
const platformHostnames = {
    "youtube": ["www.youtube.com", "m.youtube.com"]
};

// Shared list of all predefined elements that can be hidden across all targeted platforms.
const elementsThatCanBeHidden = [
    // YouTube
    "youtubeSearch", "youtubeSearchPredict", "youtubeRecVids", "youtubeThumbnails", "youtubeNotifications", "youtubeProfileImg",
    "youtubeShorts", "youtubeSubscriptions", "youtubeHistory", "youtubeExplore", "youtubeMore",
    "youtubeRelated", "youtubeSidebar", "youtubeComments", "youtubeAds", "youtubeViews", "youtubeLikes", "youtubeSubscribers"
];

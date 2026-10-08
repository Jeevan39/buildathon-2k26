import React from "react";
import { Hash, ExternalLink, Sparkles } from "lucide-react";
import { InstagramIcon } from "./InstagramIcon";
import { eventData } from "../data/hackathonData";

export const SocialSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-[#060d1a] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20 flex-shrink-0">
              <InstagramIcon className="w-8 h-8 text-white" />
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-400 block mb-0.5">
                Official Updates Channel
              </span>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
                Follow Us on Instagram
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Official handles:{" "}
                <strong className="text-slate-200">
                  {eventData.social.instagramHandle}
                </strong>{" "}
                • Tag posts with{" "}
                <strong className="text-rose-400">
                  {eventData.social.hashtag}
                </strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 flex-wrap justify-center">
            <span className="font-mono text-xs font-bold bg-slate-800 text-sky-300 px-3 py-2 rounded-xl border border-slate-700">
              {eventData.social.hashtag}
            </span>

            <a
              href={eventData.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-heading font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-md shadow-rose-500/20 transition-all"
            >
              <InstagramIcon className="w-4 h-4 text-white" />
              <span>FOLLOW ON INSTAGRAM</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

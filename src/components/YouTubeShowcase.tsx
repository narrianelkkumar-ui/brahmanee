import React, { useState } from 'react';
import { Youtube, Play, ExternalLink, ThumbsUp, Bell, Sparkles, Phone } from 'lucide-react';
import { YouTubeVideo } from '../types';

interface YouTubeShowcaseProps {
  lang: 'te' | 'en';
}

export const YouTubeShowcase: React.FC<YouTubeShowcaseProps> = ({ lang }) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const channelUrl = 'https://www.youtube.com/channel/UCTgK1FYdnCPrG2SY4n9DiZg';

  const sampleVideos: YouTubeVideo[] = [
    {
      id: 'v1',
      titleEn: 'How to Draw Telangana Tippon Map in AutoCAD using SEED CAD LISP',
      titleTe: 'ఆటోక్యాడ్‌లో SEED CAD LISP తో టిప్పన్ (Tippon) పటం సులభంగా వేసే విధానం',
      duration: '12:45',
      videoUrl: channelUrl,
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      description: 'Complete step-by-step guide on using TIPPON command with Numpad controls (8, 2, 4, 6) and Rupee-Annas dimensions.'
    },
    {
      id: 'v2',
      titleEn: 'TFC Command Tutorial - Fix Gaps & Overlaps with Auto Text Label Updates',
      titleTe: 'TFC కమాండ్ ట్యుటోరియల్ - టిప్పన్ గ్యాప్‌లు సరిచేస్తూ లేబుల్స్ అప్‌డేట్ చేయడం',
      duration: '08:30',
      videoUrl: channelUrl,
      thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
      description: 'Learn how TFC connects loose lines and dynamically searches up to 50 meters to update Rupees-Annas text automatically.'
    },
    {
      id: 'v3',
      titleEn: 'CTABLE & LGTABLE - Automated Survey Coordinates & Legend Tables',
      titleTe: 'CTABLE & LGTABLE - సర్వే కోఆర్డినేట్స్ మరియు లెజెండ్ టేబుల్స్ క్రియేట్ చేయడం',
      duration: '10:15',
      videoUrl: channelUrl,
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
      description: 'Generate X, Y survey boundary tables and colored land classification legend tables in 3 easy clicks.'
    },
    {
      id: 'v4',
      titleEn: 'Bhumithi Software vs SEED CAD LISP - Full Comparison for Land Surveyors',
      titleTe: 'భూమితి సాఫ్ట్‌వేర్ కంటే సీడ్ క్యాడ్ ఎందుకు మెరుగైనదో చూడండి',
      duration: '15:20',
      videoUrl: channelUrl,
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      description: 'Detailed analysis of speed, accuracy, and ease of drawing Telangana survey maps.'
    }
  ];

  return (
    <section id="youtube" className="py-16 bg-slate-50 border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Youtube className="w-4 h-4 text-red-600 fill-current" />
            <span>{lang === 'te' ? 'యూట్యూబ్ ఛానెల్ & ట్యుటోరియల్స్' : 'Official YouTube Channel & Video Guides'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {lang === 'te' ? 'నార్రి అనిల్ కుమార్ యూట్యూబ్ ఛానెల్' : 'Narri Anel Kkumar Survey YouTube Channel'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'te' 
              ? 'ఆటోక్యాడ్ సర్వేయింగ్ డ్రాయింగ్స్, టిప్పన్ టూల్స్ వాడే విధానం పూర్తి వీడియో పాఠాలు మా యూట్యూబ్ ఛానెల్లో ఉచితంగా చూడండి.' 
              : 'Watch comprehensive video tutorials, live AutoCAD demos, and survey drafting techniques on our channel.'}
          </p>
        </div>

        {/* Subscribe Hero Callout Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-red-600 flex items-center justify-center shadow-md shrink-0">
              <Youtube className="w-9 h-9 fill-current text-red-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  brahmaneecad | BRAHMANEE CAD
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  Official Channel
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/90 font-medium">
                {lang === 'te' 
                  ? 'తెలంగాణ ల్యాండ్ సర్వేయర్ల కోసం ప్రత్యేక పాఠాలు & సాఫ్ట్‌వేర్ అప్‌డేట్స్' 
                  : 'Exclusive Telangana Land Surveying Tutorials, Tips & AutoCAD LISP Updates'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <a
              href={channelUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-white text-red-600 hover:bg-slate-100 font-extrabold px-6 py-3.5 rounded-2xl text-sm transition shadow-md"
            >
              <Bell className="w-4 h-4 fill-red-600 animate-bounce" />
              <span>{lang === 'te' ? 'సబ్‌స్క్రైబ్ చేయండి (@brahmaneecad)' : 'Subscribe @brahmaneecad'}</span>
            </a>

            <a
              href="tel:+917711889955"
              className="flex items-center justify-center space-x-1 px-4 py-3.5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-mono font-bold shadow-md"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>+91 7711889955</span>
            </a>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleVideos.map((video) => (
            <div
              key={video.id}
              className="group rounded-2xl bg-white border border-slate-200 hover:border-red-300 overflow-hidden transition-all shadow-sm hover:shadow-md"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition"></div>

                {/* Play Button Overlay */}
                <button
                  onClick={() => setActiveVideo(video.id)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </button>

                {/* Duration Tag */}
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-sm text-white font-mono text-xs font-bold">
                  {video.duration}
                </span>
              </div>

              {/* Video Info */}
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-slate-900 group-hover:text-red-600 transition leading-snug">
                  {lang === 'te' ? video.titleTe : video.titleEn}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {video.description}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center space-x-1">
                    <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
                    <span>Telangana Land Survey Video</span>
                  </span>

                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-red-600 font-bold hover:underline"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

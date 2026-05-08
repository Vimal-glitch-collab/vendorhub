'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Review {
  id: string;
  author: string;
  avatar: string;
  avatarAlt: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  helpful: number;
  verified: boolean;
}

const reviews: Review[] = [
{
  id: 'r1',
  author: 'Priya Sharma',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1985c262f-1763294244026.png",
  avatarAlt: 'Young woman with warm smile, professional headshot, bright natural background',
  rating: 5,
  date: 'April 28, 2026',
  title: 'Absolutely worth every rupee!',
  body: 'The noise cancellation is incredible — I wear these during my commute and can barely hear the train. Battery life is exactly as advertised, and the sound quality is rich without being too bass-heavy. Build quality feels very premium.',
  helpful: 142,
  verified: true
},
{
  id: 'r2',
  author: 'Rahul Mehta',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16c3e88f5-1763294285249.png",
  avatarAlt: 'Young man with glasses smiling, casual professional portrait, bright office background',
  rating: 4,
  date: 'April 15, 2026',
  title: 'Great headphones, minor comfort issue after 4+ hours',
  body: "Sound quality and ANC are top-notch. I've compared it to competitors twice the price and this holds its own. Only minor gripe: after 4+ hours of continuous use, the ear cups get a bit warm. Everything else is flawless.",
  helpful: 87,
  verified: true
},
{
  id: 'r3',
  author: 'Ananya Krishnan',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c508ba90-1772145167791.png",
  avatarAlt: 'Young woman with dark hair smiling warmly, bright natural light portrait',
  rating: 5,
  date: 'March 30, 2026',
  title: 'Best purchase of 2026 for me',
  body: 'Ordered the Pearl White variant and the color is stunning in person. Pairing with two devices simultaneously works perfectly — I switch between my laptop and phone seamlessly. The carrying case is also very well made.',
  helpful: 203,
  verified: true
},
{
  id: 'r4',
  author: 'Karthik Nair',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_172fcd53a-1763299680950.png",
  avatarAlt: 'Man with short hair professional portrait, bright clean background, warm smile',
  rating: 4,
  date: 'March 12, 2026',
  title: 'Excellent value, delivered faster than expected',
  body: 'AudioTech Pro delivered this in just 2 days. Packaging was excellent, headphones arrived in perfect condition. Sound is detailed and clear. The controls take a little getting used to but after a day it becomes second nature.',
  helpful: 54,
  verified: true
}];


const ratingBreakdown = [
{ stars: 5, count: 1543, pct: 66 },
{ stars: 4, count: 586, pct: 25 },
{ stars: 3, count: 141, pct: 6 },
{ stars: 2, count: 47, pct: 2 },
{ stars: 1, count: 24, pct: 1 }];


function StarRating({ rating, size = 14 }: {rating: number;size?: number;}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
      <svg key={star} style={{ width: size, height: size }} className={star <= Math.round(rating) ? 'text-accent' : 'text-border'} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </div>);

}

export default function ProductReviews({ rating, reviewCount }: {rating: number;reviewCount: number;}) {
  const [helpfulVoted, setHelpfulVoted] = useState<Set<string>>(new Set());

  const voteHelpful = (id: string) => {
    setHelpfulVoted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Overall rating */}
        <div className="flex flex-col items-center justify-center p-6 bg-secondary rounded-2xl text-center">
          <p className="text-6xl font-extrabold text-foreground mb-2">{rating}</p>
          <StarRating rating={rating} size={20} />
          <p className="text-sm text-muted-foreground mt-2">{reviewCount.toLocaleString()} reviews</p>
        </div>

        {/* Rating breakdown */}
        <div className="md:col-span-2 space-y-2.5">
          {ratingBreakdown.map((row) =>
          <div key={row.stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16 shrink-0">
                <span className="text-sm font-medium text-muted-foreground">{row.stars}</span>
                <Icon name="StarIcon" size={12} variant="solid" className="text-accent" />
              </div>
              <div className="flex-1 bg-border rounded-full h-2 overflow-hidden">
                <div
                className="h-full bg-accent rounded-full transition-all duration-700"
                style={{ width: `${row.pct}%` }} />
              
              </div>
              <span className="text-xs text-muted-foreground w-10 text-right shrink-0">{row.pct}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Write a review */}
      <div className="p-5 bg-card border border-border rounded-2xl mb-8">
        <h4 className="text-base font-bold text-foreground mb-3">Share your experience</h4>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-sm text-muted-foreground">Your rating:</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) =>
            <button key={s} className="text-border hover:text-accent transition-colors" aria-label={`Rate ${s} stars`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <textarea
          placeholder="Tell others what you think about this product..."
          rows={3}
          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all resize-none mb-3" />
        
        <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors">
          Submit Review
        </button>
      </div>

      {/* Review list */}
      <div className="space-y-5">
        {reviews.map((review) =>
        <div key={review.id} className="p-5 bg-card border border-border rounded-2xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-secondary border border-border">
                <AppImage src={review.avatar} alt={review.avatarAlt} fill className="object-cover" sizes="40px" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <p className="text-sm font-bold text-foreground">{review.author}</p>
                  {review.verified &&
                <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-semibold rounded-full">
                      <Icon name="CheckBadgeIcon" size={10} />
                      Verified Purchase
                    </span>
                }
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={review.rating} />
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </div>
            <h5 className="text-sm font-bold text-foreground mb-1.5">{review.title}</h5>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{review.body}</p>
            <div className="flex items-center gap-3 pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Helpful?</span>
              <button
              onClick={() => voteHelpful(review.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              helpfulVoted.has(review.id) ?
              'bg-accent/10 text-accent border border-accent/30' : 'border border-border text-muted-foreground hover:bg-secondary hover:text-foreground'}`
              }>
              
                <Icon name="HandThumbUpIcon" size={12} />
                {review.helpful + (helpfulVoted.has(review.id) ? 1 : 0)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>);

}
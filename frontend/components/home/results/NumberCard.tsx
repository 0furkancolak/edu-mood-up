"use client";
import React, { useState, useEffect, useRef } from 'react';

const NumberCard = ({ number }: any) => {
    const [displayNumber, setDisplayNumber] = useState(0);
    const numberRef = useRef(null);
  
    useEffect(() => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Yüzde olarak görünürlük eşiği
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let start = 0;
            const end = number;
            let duration = Math.abs(end - start) * 10; // Animasyon süresi (ms), küçük rakamlar için daha hızlı animasyon
            if (duration > 2000) duration = 2000; // Maksimum animasyon süresi
  
            const timer = setInterval(() => {
              if (start < end) {
                start += Math.max(1, Math.floor((end - start) / 50)); // Sayıyı artırma miktarı
                setDisplayNumber(start);
              } else {
                clearInterval(timer);
              }
            }, duration / Math.abs(end - start));
  
            return () => clearInterval(timer);
          }
        });
      }, options);
  
      if (numberRef.current) {
        observer.observe(numberRef.current);
      }
  
      return () => {
        if (numberRef.current) {
          observer.unobserve(numberRef.current);
        }
      };
    }, [number]);
  
    return (
      <div ref={numberRef}>
        {displayNumber.toLocaleString()}+
      </div>
    );
  };

export default NumberCard;

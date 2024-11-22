"use client"
import React, { useState, useEffect } from "react";
import { cn } from "@lib/utils";
import { ReviewItem } from "../About/Reviews/ReviewItem";
import { useTranslations } from "next-intl";
interface Props {
  className?: string;
}

const reviews = [
  {
    name: "maria_nosachevaa",
    date: "16.11.2021",
    avatar: "/images/ivanov.jpg",
    reviewText:
      "Наконец-то нашли!!! Именно так хочется начать писать о ШРОТ методе и Александре, очень грамотном терапевте. Мы с Ростовской области, у дочки С-образный левосторонний поясничный сколиоз 3 степени. По назначениям врачей систематически проходили ЛФК, массаж, посещали физ. кабинет, но сколиоз только прогрессировал. Узнав о Шрот терапии, мы начали искать сертифицированного специалиста и нашли, недалеко от нас! Уже после первых занятий, мы увидели результаты. Это очень большая работа, под чутким сопровождением Александра, я уверена, мы справимся!",
  },
  {
    name: "senshinanatali",
    date: "16.11.2021",
    avatar: "/images/petrov.jpg",
    reviewText:
      "Спасибо, Александр, за ваши тренировки, индивидуальную программу, эмоциональную поддержку, настойчивость в достижении результата и профессиональное сопровождение.Результат видно было сразу. Дочка перестала сутулиться, спину стала держать ровно и самое главное: прошли головные боли!",
  },
  {
    name: "_zhukova_e",
    date: "16.11.2021",
    avatar: "/images/petrov.jpg",
    reviewText:
      "Позанимались 10 занятий, не жалеем потраченного времени и денежных средств, результат виден в лучшую сторону. Спасибо Александру за проделанную работу и обучению шрот-терапии.",
  },
  {
    name: "_kidakoeva_",
    date: "19.11.2021",
    avatar: "/images/petrov.jpg",
    reviewText:
      "Спасибо большое, Александр, за проделанную работу. Не зря мне Вас порекомендовали. Все объяснили доходчиво, отвечая на каждый мой вопрос. За 10 занятий видна такая колоссальная разница 🔥 Головокружения меня больше не мучают, общее состояние улучшилось, видны визуально изменения... можно много перечислять, и это всё спустя всего 10 занятий. Единственное, о чём жалею, что не обратилась к Вам раньше!!!",
  },
  {
    name: "helenbelsev14",
    date: "16.11.2021",
    avatar: "/images/petrov.jpg",
    reviewText:
      "Хороший специалист вкладывает душу и хочет помочь👏",
  },
  {
    name: "voycenko_aigul",
    date: "20.11.2021",
    avatar: "/images/petrov.jpg",
    reviewText:
      "Александр, мы благодарим вас за вашу работу, отзывчивость и внимание. При нашем диагнозе сколиоз 3ст вы доступно объяснили, что вылечиться от сколиоза можно, освоив технику неравномерного дыхания. Что тело человека, страдающего от сколиоза, чем-то схоже с деформированным резиновым мячом. Если мячик наполнить воздухом, он распрямится. Благодаря вашим занятиям, корсету Шено и выполнению рекомендованной вами дыхательной гимнастики, у моего ребёнка видимые улучшения!!! Градус искривления стал меньше, и визуально спина стала ровная!!! Огромное спасибо вам за ваш труд! Будем рады заниматься с вами и дальше!!!",
  },
  {
    name: "jykova2021",
    date: "17.11.2021",
    avatar: "/images/petrov.jpg",
    reviewText:
      "Спасибо за проделанную работу, Александр знает толк в своём деле, результат виден через 10 занятий, жалеем, что раньше не познакомились с ним.",
  },
  {
    name: "chebotarevajuliya",
    date: "29.11.2021",
    avatar: "/images/petrov.jpg",
    reviewText:
      "Хочу выразить благодарность Александру за то, что он принес эту чудесную методику в Краснодар, за его подход к каждому ребенку, за профессионализм. Сразу видно, что человек горит своим делом, всецело отдается работе, а это, в свою очередь, заряжает уверенностью и оптимизмом и нас, родителей, и детей в борьбе с этим нелегким недугом. Теперь после курса занятий с Александром, мы с дочкой ни капли не сомневаемся, что у нас все получится и мы справимся. Спасибо большое 🌷🌷🌷",
  },
  {
    name: "zalinatimova",
    date: "25.11.2021",
    avatar: "/images/petrov.jpg",
    reviewText:
      "Здравствуйте, я мама Марииты, которая прошла долгий путь, начиная от ЛФК, плавание 🏊‍♀️, фитнес... Становилось хуже... Я долго присматривалась к Александру, почти год, и решилась на приём. С первой встречи Александр расположил нас и доходчиво объяснил шрот-терапию. Внимательный, реально с ним время летит, доходчиво всё объясняет, настраивает на результат. Не теряйте драгоценное время впустую, обращайтесь к профессионалу Александру. Желаем профессионального роста и удачи 👍❤️👏👏👏",
  },
];

// Helper function to truncate text
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const ReviewsList = ({ className }: Props) => {
  const t = useTranslations("Reviews");
  // State to track whether reviews are expanded or not
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(3); // Default for mobile

  // Function to toggle show/hide of reviews
  const toggleReviews = () => {
    setIsExpanded(!isExpanded);
  };

  // Adjust the number of reviews based on the screen size
  const adjustVisibleReviews = () => {
    if (window.innerWidth >= 1000) {
      setVisibleReviewsCount(9); // Desktop
    } else if (window.innerWidth >= 650) {
      setVisibleReviewsCount(6); // Tablet
    } else {
      setVisibleReviewsCount(3); // Mobile
    }
  };

  // Use effect to adjust visible reviews on window resize
  useEffect(() => {
    adjustVisibleReviews(); // Adjust initially
    window.addEventListener("resize", adjustVisibleReviews); // Adjust on resize

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", adjustVisibleReviews);
    };
  }, []);

  return (
    <section className={cn("py-24", className)}>
      <div className="w-full max-w-[1500px] mx-auto px-4 flex flex-col gap-8">
        <h1 className="text-4xl font-semibold">{t('title')}</h1>
        <div className="grid grid-cols-1 mdx:grid-cols-2 lgx:grid-cols-3 gap-4">
          {reviews
            .slice(0, isExpanded ? reviews.length : visibleReviewsCount)
            .map((review, index) => (
              <ReviewItem
                key={index}
                name={review.name}
                date={review.date}
                avatar={review.avatar}
                reviewText={truncateText(review.reviewText, 400)} // Truncate here
                className="shadow-md p-4"
              />
            ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={toggleReviews}
            className="px-6 py-3 bg-blue-500 rounded-full text-white"
          >
            {isExpanded ? t('collapse') : t('showAll')}
          </button>
        </div>
      </div>
    </section>
  );
};

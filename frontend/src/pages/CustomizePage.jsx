import React, { useState } from "react";
import { assets } from "../assets/assets";

const CustomizePage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedSentence, setSelectedSentence] = useState("");

  const toggleCategory = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  

  const categories = [
    {
        "name": "Motivational & Inspirational",
        "quotes": [
          "Stay Humble, Hustle Hard.",
          "Dream Big, Work Hard.",
          "Be the Change You Wish to See.",
          "One Life, Live it Well.",
          "Good Things Take Time.",
          "Trust the Process.",
          "Make it Happen.",
          "Create Your Own Sunshine.",
          "Rise Above.",
          "Don't Just Exist, Live.",
          "Believe in Yourself.",
          "Success is a Journey, Not a Destination.",
          "Keep Going, Keep Growing.",
          "Dream. Believe. Achieve.",
          "One Life. Make It Count.",
          "No Pressure, No Diamonds.",
          "Small Steps Lead to Big Results.",
          "Failure is Not the End.",
          "Your Future is Created by What You Do Today.",
          "Nothing is Impossible.",
          "Live Bold, Stay Strong.",
          "Hustle Until Your Haters Ask If You’re Hiring.",
          "Do What You Love, Love What You Do.",
          "You Are Stronger Than You Think.",
          "Never Stop Learning.",
          "Your Only Limit is You.",
          "Every Day is a Fresh Start.",
          "Be Fearless in the Pursuit of Your Dreams.",
          "Keep Pushing Forward.",
          "The Best is Yet to Come.",
          "Don't Wait for Opportunity, Create It.",
          "Be Somebody Nobody Thought You Could Be.",
          "Your Vibe Attracts Your Tribe.",
          "Work Hard in Silence, Let Success Make the Noise.",
          "You Can Do Hard Things.",
          "Prove Them Wrong.",
          "Stay Positive, Work Hard, Make It Happen.",
          "What You Do Today Can Improve All Your Tomorrows.",
          "Live with Passion.",
          "If It Doesn't Challenge You, It Won't Change You.",
          "Great Things Never Come from Comfort Zones.",
          "Your Energy Introduces You Before You Speak.",
          "Keep Moving Forward.",
          "Do More of What Makes You Happy.",
          "Success Requires Hard Work.",
          "Become the Best Version of Yourself.",
          "Turn Setbacks into Comebacks.",
          "A Winner is a Dreamer Who Never Gives Up.",
          "Be Stronger Than Your Excuses.",
          "Life is Tough, But So Are You.",
          "Believe in the Magic of New Beginnings.",
          "Doubt Kills More Dreams Than Failure Ever Will.",
          "Be a Goal Getter.",
          "Start Where You Are, Use What You Have, Do What You Can.",
          "Let Your Dreams Be Bigger Than Your Fears.",
          "Courage Over Comfort.",
          "Think Big, Start Small, Act Now.",
          "Be the Energy You Want to Attract.",
          "You Didn't Come This Far to Only Come This Far.",
          "Stay Hungry, Stay Foolish.",
          "Push Yourself Because No One Else Will Do It for You.",
          "A Little Progress Each Day Adds Up to Big Results.",
          "Do It with Passion or Not at All.",
          "Everything You Want is on the Other Side of Fear.",
          "Big Dreams, Hard Work, No Excuses.",
          "If You Want It, Work for It.",
          "Stars Can’t Shine Without Darkness.",
          "Keep Dreaming, Keep Believing.",
          "Success is the Best Revenge.",
          "Your Attitude Determines Your Direction.",
          "Start Now, Not Later.",
          "Stop Wishing, Start Doing.",
          "Turn Your Can'ts Into Cans.",
          "Be the Reason Someone Smiles Today.",
          "Nothing Changes If Nothing Changes.",
          "Mindset is Everything.",
          "Focus on the Good.",
          "Never Give Up on Yourself.",
          "You Were Born to Stand Out.",
          "Stay Focused & Never Settle.",
          "Lead by Example.",
          "Act Like a Boss, Think Like a Leader.",
          "Success Loves Preparation.",
          "There is No Elevator to Success, Take the Stairs.",
          "You’re Closer Than You Think.",
          "The Key to Success is to Start Before You’re Ready.",
          "Slay Your Goals.",
          "Your Mind is a Powerful Thing. Use It Wisely.",
          "Every Expert Was Once a Beginner.",
          "Do What They Say You Can’t.",
          "Your Hard Work Will Pay Off.",
          "Stay Determined, Stay Motivated.",
          "Turn Dreams into Reality.",
          "Go the Extra Mile, It’s Never Crowded.",
          "Success Starts with Self-Discipline.",
          "The Future is Bright.",
          "Stay Wild, Stay Free.",
          "Life is Too Short to Wait.",
          "Winners Focus on Winning, Losers Focus on Winners.",
          "Make Today Amazing!"
        ]
      },
      
    {
        name: "Funny & Sarcastic",
        quotes: [
          "I’m Not Lazy, I’m on Energy-Saving Mode.",
          "This T-shirt is My Formal Wear.",
          "I Came, I Saw, I Made It Awkward.",
          "Adulting is Hard.",
          "Sarcasm is My Superpower.",
          "I Put the ‘Pro’ in Procrastinate.",
          "Oops! Did I Roll My Eyes Out Loud?",
          "99% Coffee, 1% Human.",
          "Alexa, Do My Homework.",
          "I’m Not Arguing, I’m Just Explaining Why I’m Right.",
          "I Have Too Many Tabs Open… in My Brain.",
          "Current Mood: Meh.",
          "I’m Not Short, I’m Fun-Sized.",
          "Life’s Too Short for Matching Socks.",
          "Hold On, Let Me Overthink This.",
          "I’m Not Clumsy, The Floor Just Hates Me.",
          "If I Agreed With You, We’d Both Be Wrong.",
          "I’m on a Seafood Diet—I See Food, I Eat It.",
          "Dear Sleep, I’m Sorry I Cheated on You With the Internet.",
          "I Need a Six-Month Vacation Twice a Year.",
          "I’d Rather Be Sleeping.",
          "Running Late is My Cardio.",
          "Nacho Average Human.",
          "If Monday Had a Face, I’d Punch It.",
          "My Brain Has Too Many Tabs Open.",
          "You Lost Me at 'Hello'.",
          "Resting Grinch Face.",
          "I’m a Limited Edition.",
          "Currently Unavailable. Try Again Later.",
          "Warning: I Have No Filter.",
          "I Speak Fluent Sarcasm.",
          "Exercise? I Thought You Said Extra Fries!",
          "Everything is Fine. I’m Just Dramatic.",
          "I’m Not Bossy, I’m Just Better at Knowing What You Should Be Doing.",
          "I’m Not Late, I’m Just Running on ‘Me’ Time.",
          "I’m on a Roller Coaster That Only Goes Up—And Then Crashes.",
          "Just Here for the Snacks.",
          "I’m Not Weird, I’m Limited Edition.",
          "Life’s Too Short to Be Serious All the Time.",
          "I Have a Degree in Sarcasm.",
          "I Wish More People Were Fluent in Silence.",
          "I’m Not Lazy, I’m on Standby Mode.",
          "I Don’t Snore, I Dream of Being a Motorcycle.",
          "It’s a Beautiful Day to Leave Me Alone.",
          "If You See Me Running, Something is Chasing Me.",
          "WiFi, Food, Sleep—The Holy Trinity.",
          "I Work Out… Just Kidding, I Take Naps.",
          "My Daily Routine: Wake Up. Be Awesome. Go Back to Sleep.",
          "I’m Not Crazy, My Reality is Just Different Than Yours.",
          "Brains Are Awesome, I Wish Everybody Had One.",
          "Don’t Rush Me, I’m Waiting for the Last Minute.",
          "I Don’t Have an Attitude, I Just Have a Personality You Can’t Handle.",
          "This is My Happy Face.",
          "I Do Marathons… on Netflix.",
          "You Can’t Make Everyone Happy. You’re Not Pizza.",
          "Silence is Golden, Duct Tape is Silver.",
          "I’d Agree With You, But Then We’d Both Be Wrong.",
          "Don’t Talk to Me Until I’ve Had My Coffee… and Even Then, Maybe Don’t.",
          "Allergic to Mornings.",
          "Currently Experiencing Technical Difficulties.",
          "Sorry, I Can’t. I Have Plans With My Couch.",
          "Some People Graduate With Honors, I Am Just Here to Graduate.",
          "I’d Explain It to You, But I Left My Puppets at Home.",
          "I’m Not a Complete Idiot, Some Parts Are Missing.",
          "If Stress Burned Calories, I’d Be a Supermodel.",
          "Common Sense is Like Deodorant, Those Who Need It Most Never Use It.",
          "My Patience is Like a Limited-Edition Item—Rare & Expensive.",
          "Caution: I Break for Snacks.",
          "If You Don’t Have Anything Nice to Say, Come Sit Next to Me.",
          "I Woke Up Like This… Late.",
          "I Didn’t Choose the Nap Life, The Nap Life Chose Me.",
          "I’m Not Lazy, I’m Just Highly Motivated to Do Nothing.",
          "I Do Whatever My Rice Krispies Tell Me to Do.",
          "I Don’t Have an Attitude, I Have a Personality.",
          "Mondays Should Be Optional.",
          "It’s Not Me, It’s You.",
          "I’m Not Always Right, But I’m Never Wrong.",
          "You Inspire My Inner Serial Killer.",
          "Professional Overthinker.",
          "You Had Me at ‘We’ll Get Food’.",
          "It’s Too ‘Peopley’ Outside.",
          "If You Met My Family, You’d Understand.",
          "I’m the Reason We Can’t Have Nice Things.",
          "I Paused My Game to Be Here—Appreciate It.",
          "I Put the ‘Hot’ in ‘Hot Mess’.",
          "I’m Not Lazy, I’m in Energy Conservation Mode.",
          "Why Fall in Love When You Can Fall Asleep?",
          "Haters Gonna Hate, Potatoes Gonna Potate.",
          "I Could Be Social, But I’d Rather Not.",
          "I Like Long Walks… to the Fridge.",
          "Life Happens, Coffee Helps.",
          "Sarcasm: Because Punching People is Illegal.",
          "If You Think I Care, You’re Wrong.",
          "Born to Stand Out, Forced to Fit In.",
          "This T-shirt is More Interesting Than You.",
          "Introverts Unite! Separately… in Our Own Homes.",
          "The Answer is ‘No.’ What’s the Question?",
          "I Can’t Hear You Over the Sound of My Own Greatness.",
          "Why Fit In When You Were Born to Stand Out?",
          "Some Call it Sarcasm, I Call it Intelligence."
        ],
      },
    { name: "Tech & Geeky", quotes: ["404 Error: Sleep Not Found.", "Ctrl + Alt + Del Life."] },
    { name: "Fitness & Gym", quotes: ["Train Like a Beast, Look Like a Beauty.", "Wake Up, Work Out, Repeat."] },
    { name: "Trendy & Stylish", quotes: ["Your Vibe Attracts Your Tribe.", "Fearless & Flawless."] },
    { name: "Travel & Adventure", quotes: ["Catch Flights, Not Feelings.", "Let’s Get Lost."] },
    { name: "Educational & Learning", quotes: ["Knowledge is Power.", "Stay Curious, Keep Learning."] },
    { name: "Music & Pop Culture", quotes: ["Music is My Escape.", "No Music, No Life."] },
    { name: "Sports & Athletic", quotes: ["Champions Train, Losers Complain.", "Play Hard, Win Big."] },
    { name: "Work Life & Hustle", quotes: ["Eat, Sleep, Hustle, Repeat.", "Mondays Should Be Optional."] },
    { name: "Positive Quotes & Affirmations", quotes: ["You Are Enough.", "Radiate Positivity."] },
    { name: "Relationship & Love", quotes: ["Love is the Answer.", "Together, We Shine."] },
    { name: "Pet Lovers", quotes: ["Paws & Relax.", "Dog Mom Life."] },
    { name: "Family & Parenthood", quotes: ["World’s Best Dad.", "Mom Life, Best Life."] },
    { name: "Food & Coffee Lovers", quotes: ["Coffee First, Talk Later.", "Tacos Are My Love Language."] },
    { name: "Spiritual & Mindfulness", quotes: ["Namaste & Chill.", "Peace Begins With Me."] },
    { name: "Environmental & Eco-Friendly", quotes: ["Save the Earth, It’s the Only One With Coffee.", "Plant More Trees."] },
    { name: "Party & Fun", quotes: ["Let’s Get This Party Started!", "Too Lit to Quit."] },
    { name: "Customizable & Personalized", quotes: ["[Your Name]’s Signature Look.", "Your Design Here."] },
    { name: "Minimalist & Aesthetic", quotes: ["Less Perfection, More Authenticity.", "Simplicity is Key."] },
    { name: "Gaming & Esports", quotes: ["Level Up!", "Respawn & Try Again."] },
    { name: "Streetwear & Urban Style", quotes: ["Born to Stand Out.", "City Lights, Late Nights."] },
    { name: "College & Student Life", quotes: ["Sleep, Study, Repeat.", "I Survived Another Semester."] },
    { name: "Book Lovers & Writers", quotes: ["Just One More Chapter.", "Books Over Looks."] },
    { name: "Introvert & Extrovert Vibes", quotes: ["I’d Rather Be Home.", "Talk Less, Smile More."] },
    { name: "Feminist & Empowerment", quotes: ["Girls Can Do Anything.", "Stronger Than Yesterday."] },
    { name: "Dad Jokes & Puns", quotes: ["Nacho Average T-Shirt.", "I’m on a Seafood Diet—I See Food, I Eat It."] },
    { name: "Retro & Vintage Vibes", quotes: ["Old School Cool.", "Classic Never Goes Out of Style."] },
    { name: "Zodiac & Astrology", quotes: ["Capricorn Energy.", "It’s a Leo Thing, You Wouldn’t Understand."] },
    { name: "Anime & Fandom Culture", quotes: ["Kawaii & Proud.", "Powered by Ramen & Anime."] },
    { name: "Horror & Dark Humor", quotes: ["Keep Calm & Watch Horror Movies.", "Creepin’ It Real."] },
    { name: "Science & Space Lovers", quotes: ["Future Scientist in Progress.", "NASA Called, They Need Me Back."] },
    { name: "Patriotic & National Pride", quotes: ["Proud to Be [Your Country].", "Land of the Free, Home of the Brave."] },
    { name: "Business & Entrepreneur Mindset", quotes: ["CEO in the Making.", "Start Small, Dream Big."] },
    { name: "Luxury & High-End Fashion", quotes: ["Elegance is an Attitude.", "Chasing Dreams in High Heels."] },
    { name: "DIY & Handmade Lovers", quotes: ["Crafting is My Therapy.", "Handmade with Love."] },
    { name: "Holiday & Seasonal", quotes: ["Merry & Bright (Christmas).", "Pumpkin Spice & Everything Nice (Fall)."] },
    { name: "Wedding & Anniversary", quotes: ["Bride Squad.", "Happily Ever After."] },
    { name: "Car & Motorcycle Enthusiasts", quotes: ["Life is Better on Two Wheels.", "Fast Cars & Freedom."] },
    { name: "Beach & Summer Vibes", quotes: ["Salty but Sweet.", "Sunkissed & Happy."] },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left Section - Categories List */}
      <div className="w-full md:w-1/3 p-6 bg-gray-100 overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index} className="border-b pb-2">
              <button
                className="w-full text-left text-lg font-semibold p-2 bg-white rounded-lg shadow-md hover:bg-green-500 hover:text-white transition duration-300"
                onClick={() => toggleCategory(index)}
              >
                {category.name}
              </button>
              {activeIndex === index && (
                <ul className="mt-2 ml-4 text-black-700">
                  {category.quotes.map((quote, qIndex) => (
                    <li
                      key={qIndex}
                      className={`text-sm p-2 rounded-md my-1 cursor-pointer transition duration-200 ${
                        selectedSentence === quote ? "bg-green-500 text-white" : "bg-grey-200 hover:bg-green-300"
                      }`}
                      onClick={() => setSelectedSentence(quote)}
                    >
                      {quote}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      
      {/* Right Section - Image with Selected Sentence */}
      <div className="w-full md:w-2/3 flex flex-col items-center justify-center bg-gray-200 relative">
      {selectedSentence && (
          <div className="absolute bottom-55 text-white text-lg font-semibold p-3 rounded-lg">
            {selectedSentence}
          </div>
        )}
        <img
          src={assets.tshirt} // Replace with actual image URL
          alt="Category Image"
          className="max-w-full h-auto rounded-lg shadow-lg"
        />

    <div className="flex items-center justify-center  bg-none">
      <h1 className="text-5xl md:text-7xl font-bold text-center text-black" style={{ fontFamily: 'Brush Script MT, cursive' }}>
        Stay Humble, <br /> Hustle Hard.
      </h1>
    </div>
        
      </div>
    </div>
  );
};

export default CustomizePage;
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Copy, RefreshCw, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Quote {
  text: string;
  author: string;
}

const fallbackQuotes: Quote[] = [
  { text: "அறிவில்லாதவன் உழைப்பான் என்று நினைத்து விடு.", author: "திருவள்ளுவர்" },
  { text: "உழைப்பு உயர்ந்தது, அறிவும் கூட வேண்டும்.", author: "ஔவையார்" },
  { text: "தீர்க்கம் கொண்டவன் எப்போதும் வெற்றி பெறும்.", author: "பெரியார்" },
  { text: "நன்றாக செய்யாதவன் பொய் பேசுகிறான்.", author: "பாரதி" },
  { text: "நம்பிக்கை வைக்காமல் முன்னேற முடியாது.", author: "திருவள்ளுவர்" },
  { text: "சிறிய முயற்சியும் வெற்றிக்கான வழியைத் திறக்கும்.", author: "ஔவையார்" },
  { text: "நேர்மையும் கடின உழைப்பும் வெற்றியின் அடிப்படை.", author: "பெரியார்" },
  { text: "உற்சாகமும் நம்பிக்கையும் ஒரே நேரத்தில் இருக்க வேண்டும்.", author: "பாரதி" },
  { text: "மிகப்பெரிய கனவுகளை நினைத்து முயற்சி செய்.", author: "திருவள்ளுவர்" },
  { text: "அறிவும் செயலும் இல்லாதவன் தோல்வியடையும்.", author: "ஔவையார்" },
  { text: "நீங்கள் முயற்சி செய்யாதால் வெற்றி வராது.", author: "பெரியார்" },
  { text: "வாழ்க்கை என்பது முயற்சியின் விளைவு.", author: "பாரதி" },
  { text: "சிரமம் வந்தாலும் விடாதே, அது வெற்றிக்கு வழி.", author: "திருவள்ளுவர்" },
  { text: "நல்ல நண்பர்கள் உங்களை உயர்த்துவர்.", author: "ஔவையார்" },
  { text: "நம்பிக்கை வைப்பவரே உயர்வு காண்பார்.", author: "பெரியார்" },
  { text: "மிகப்பெரிய சிரமங்களும் சாதனைக்கு வழிகாட்டும்.", author: "பாரதி" },
  { text: "அறிவுடைமை வெற்றி தரும்.", author: "திருவள்ளுவர்" },
  { text: "சிறிய முன்னேற்றம் கூட பெரும் வெற்றிக்கு வழிகாட்டும்.", author: "ஔவையார்" },
  { text: "உழைப்போடு நம்பிக்கை வைத்தால் எல்லாம் சாத்தியம்.", author: "பெரியார்" },
  { text: "வாழ்க்கையில் வெற்றி பெற உழைப்பு முக்கியம்.", author: "பாரதி" },
  { text: "நீங்கள் நினைத்ததை செய், அதுவே வெற்றிக்கான வழி.", author: "திருவள்ளுவர்" },
  { text: "தோல்வி என்பது பயிற்சி, அதை பயன்படுத்தி முன்னேறு.", author: "ஔவையார்" },
  { text: "நல்ல நடத்தை உயர்வு தரும்.", author: "பெரியார்" },
  { text: "சிறிய முயற்சிகளும் பெரிய வெற்றிக்கு வழிகாட்டும்.", author: "பாரதி" },
  { text: "நம்பிக்கை இல்லாதவனுக்கு வெற்றி வராது.", author: "திருவள்ளுவர்" },
  { text: "உழைப்போடு முயற்சி செய், கனவுகள் நனவாகும்.", author: "ஔவையார்" },
  { text: "மிகப்பெரிய சிரமம் வந்தாலும் விடாதே.", author: "பெரியார்" },
  { text: "அறிவுடைமை மற்றும் முயற்சி இணைந்தால் வெற்றி உறுதி.", author: "பாரதி" },
  { text: "நல்ல செயல்கள் நல்வாழ்க்கைக்கு வழிகாட்டும்.", author: "திருவள்ளுவர்" },
  { text: "உங்கள் முயற்சியை விட்டுவிடாதே, வெற்றி உங்கள் பாதியில்.", author: "ஔவையார்" },
  { text: "சிரமங்கள் நம்பிக்கையுடன் எதிர்கொள்.", author: "பெரியார்" },
  { text: "தோல்வி பயிற்சி, வெற்றி பயிற்சியின் பலன்.", author: "பாரதி" },
  { text: "மிகப்பெரிய கனவுகளை நினைத்து அதை அடைய உழை.", author: "திருவள்ளுவர்" },
  { text: "நம்பிக்கை மற்றும் முயற்சி வெற்றிக்கான மூலதனம்.", author: "ஔவையார்" },
  { text: "வாழ்க்கையில் முன்னேற உழைப்பு மிக முக்கியம்.", author: "பெரியார்" },
  { text: "சிறிய முயற்சி கூட சாதனையை தரும்.", author: "பாரதி" },
  { text: "நீங்கள் நினைத்ததைச் செய், வெற்றி நிச்சயம்.", author: "திருவள்ளுவர்" },
  { text: "உழைப்பு என்பது வெற்றிக்கு அடிப்படை.", author: "ஔவையார்" },
  { text: "மிகப்பெரிய கனவுகளை நம்பிக்கை வைத்து அடையவும்.", author: "பெரியார்" },
  { text: "நல்ல செயல் உயர்வு தரும்.", author: "பாரதி" },
  { text: "தோல்வி பயிற்சி; அதை பயன்படுத்தி முன்னேறு.", author: "திருவள்ளுவர்" },
  { text: "நம்பிக்கை இல்லாதவனுக்கு சாதனை இல்லை.", author: "ஔவையார்" },
  { text: "வெற்றி உழைப்போடு மட்டுமே வரும்.", author: "பெரியார்" },
  { text: "சிறிய முன்னேற்றம் கூட வெற்றிக்கான அடிப்படை.", author: "பாரதி" },
  { text: "நீங்கள் செய்யும் முயற்சிகள் வெற்றிக்கு வழிகாட்டும்.", author: "திருவள்ளுவர்" },
  { text: "அறிவு மற்றும் முயற்சி இணைந்தால் வெற்றி உறுதி.", author: "ஔவையார்" },
  { text: "வாழ்க்கையில் சாதனை செய்ய உழைப்பு முக்கியம்.", author: "பெரியார்" },
  { text: "சிறிய முயற்சியும் பெரிய வெற்றிக்கு வழிகாட்டும்.", author: "பாரதி" },
  { text: "நம்பிக்கை வைக்காமல் முன்னேற முடியாது.", author: "திருவள்ளுவர்" },
  { text: "உழைப்பு மற்றும் கடின உழைப்பு வெற்றிக்கான மூலதனம்.", author: "ஔவையார்" },
  { text: "நல்ல செயல்கள் வாழ்வை உயர்த்தும்.", author: "பெரியார்" },
  { text: "வெற்றி என்பது தொடர்ந்து முயற்சிப்பவருக்கே வரும்.", author: "பாரதி" },
  { text: "நம்பிக்கை வைப்பவர் மட்டுமே முன்னேறும்.", author: "திருவள்ளுவர்" },
  { text: "முயற்சியுடன் கனவுகளை அடைய முயற்சி செய்.", author: "ஔவையார்" },
  { text: "சிறிய முயற்சியும் சாதனையை தரும்.", author: "பெரியார்" }
];
  

const gradients = [
  'var(--quote-gradient-1)',
  'var(--quote-gradient-2)', 
  'var(--quote-gradient-3)',
  'var(--quote-gradient-4)',
  'var(--quote-gradient-5)'
];

export default function QuoteCard() {
  const [quote, setQuote] = useState<Quote>(fallbackQuotes[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentGradient, setCurrentGradient] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();

  const fetchQuote = async () => {
    setIsLoading(true);
    setIsAnimating(true);
    
    try {
      const response = await fetch('https://type.fit/api/quotes');
      const quotes = await response.json();
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      
      // Clean up the author name
      let author = randomQuote.author || 'Unknown';
      if (author.includes(', type.fit')) {
        author = author.replace(', type.fit', '');
      }
      
      // Simulate loading delay for better UX
      setTimeout(() => {
        setQuote({
          text: randomQuote.text,
          author
        });
        setCurrentGradient((prev) => (prev + 1) % gradients.length);
        setIsLoading(false);
        setIsAnimating(false);
      }, 800);
      
    } catch (error) {
      // Fallback to local quotes if API fails
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setTimeout(() => {
        setQuote(randomQuote);
        setCurrentGradient((prev) => (prev + 1) % gradients.length);
        setIsLoading(false);
        setIsAnimating(false);
      }, 800);
      console.error('Failed to fetch quote:', error);
    }
  };

  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
      toast({
        title: "Quote Copied!",
        description: "The quote has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy quote to clipboard.",
        variant: "destructive",
      });
    }
  };

  // Change gradient on component mount
  useEffect(() => {
    setCurrentGradient(Math.floor(Math.random() * gradients.length));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="gradient-bg animate-gradient-shift"
        style={{ 
          background: gradients[currentGradient],
          backgroundSize: '400% 400%'
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-1 h-1 bg-white/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-white/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Quote Card */}
      <div className={`quote-card max-w-4xl w-full p-8 md:p-12 mx-4 transition-all duration-500 ${
        isAnimating ? 'animate-fade-out' : 'animate-fade-in'
      }`}>
        
        {/* Quote Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
            <Heart className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Quote Text */}
        <div className="mb-8 min-h-[200px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-6 h-6 animate-spin text-primary" />
              <span className="text-muted-foreground">Finding inspiration...</span>
            </div>
          ) : (
            <div className="space-y-6">
              <blockquote className="quote-text">
                "{quote.text}"
              </blockquote>
              <p className="quote-author">
                — {quote.author}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={fetchQuote}
            disabled={isLoading}
            className="btn-primary min-w-[160px]"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                New Quote
              </>
            )}
          </Button>
          
          <Button
            onClick={copyQuote}
            variant="outline"
            className="btn-secondary min-w-[140px]"
            disabled={isLoading}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Quote
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 w-20 h-20 border border-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-4 right-4 w-16 h-16 border border-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}
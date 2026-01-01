import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 glass border-b">
        <div className="container-vyxo">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-vyxo-navy flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="font-bold text-xl hidden sm:inline">
                <span className="text-vyxo-navy dark:text-white">VYXO</span>
                <span className="text-vyxo-gold ml-1">Codex</span>
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link 
                href="/#features" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Fonctionnalités
              </Link>
              <Link 
                href="/pricing" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Tarifs
              </Link>
              <Link 
                href="/demo" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Démo
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Bouton Consultant */}
              <Link href="/partners" className="hidden md:block">
                <Button variant="outline" size="sm" className="border-vyxo-gold/50 text-vyxo-gold hover:bg-vyxo-gold/10">
                  👨‍💼 Je suis consultant
                </Button>
              </Link>
              
              <ThemeToggle />
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Connexion
                </Button>
              </Link>
              <Link href="/signup" className="hidden sm:block">
                <Button size="sm" className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy font-semibold">
                  Essai Gratuit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-vyxo-navy text-white py-16">
        <div className="container-vyxo">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-vyxo-gold flex items-center justify-center">
                  <span className="text-vyxo-navy font-bold text-xl">V</span>
                </div>
                <span className="font-bold text-xl">
                  VYXO <span className="text-vyxo-gold">Codex</span>
                </span>
              </Link>
              <p className="text-gray-400 text-sm max-w-xs">
                Plateforme d'excellence opérationnelle pour transformer votre conformité en avantage compétitif.
              </p>
            </div>

            {/* Produit */}
            <div>
              <h4 className="font-semibold mb-4 text-vyxo-gold">Produit</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/#features" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Tarifs</Link></li>
                <li><Link href="/demo" className="hover:text-white transition-colors">Démo gratuite</Link></li>
                <li><Link href="/#integrations" className="hover:text-white transition-colors">Intégrations</Link></li>
              </ul>
            </div>

            {/* Ressources */}
            <div>
              <h4 className="font-semibold mb-4 text-vyxo-gold">Ressources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
                <li><Link href="/webinars" className="hover:text-white transition-colors">Webinars</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>

            {/* Légal */}
            <div>
              <h4 className="font-semibold mb-4 text-vyxo-gold">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/terms" className="hover:text-white transition-colors">CGU</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link href="/gdpr" className="hover:text-white transition-colors">RGPD</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 VYXO Consulting. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Made with ❤️ by Vyxo</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

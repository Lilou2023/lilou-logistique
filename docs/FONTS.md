# 🎨 Configuration des Polices

## Police Inter Locale

Le projet utilise la police **Inter** en version locale pour éviter les dépendances externes et améliorer les performances.

### 📁 Fichiers de police

Les fichiers de police se trouvent dans `public/fonts/` :

- `InterVariable.woff2` - Police Inter normale (variable font)
- `InterVariable-Italic.woff2` - Police Inter italique (variable font)

### ⚙️ Configuration

La police est configurée dans `app/layout.tsx` :

```typescript
const inter = localFont({
  src: [
    {
      path: '../public/fonts/InterVariable.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../public/fonts/InterVariable-Italic.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-inter',
})
```

### 🎯 Utilisation

#### Dans les composants React :
```tsx
<body className={inter.className}>
  {/* Contenu avec la police Inter */}
</body>
```

#### Dans le CSS :
```css
.my-text {
  font-family: var(--font-inter);
  font-weight: 400; /* Poids de 100 à 900 */
  font-style: italic; /* Pour l'italique */
}
```

#### Dans Tailwind CSS :
```html
<div class="font-inter font-normal italic">
  Texte en Inter normal italique
</div>
```

### 🚀 Avantages

- ✅ **Performance** : Chargement local, pas de requête externe
- ✅ **Fiabilité** : Fonctionne hors ligne et en environnement restreint
- ✅ **Flexibilité** : Support des poids 100-900 et styles normal/italic
- ✅ **Optimisation** : Variable font pour réduire la taille des fichiers

### 📦 Mise à jour des polices

Pour mettre à jour les fichiers de police :

1. Téléchargez les nouvelles versions depuis [GitHub Inter](https://github.com/rsms/inter)
2. Remplacez les fichiers dans `public/fonts/`
3. Testez le build : `npm run build`
4. Vérifiez le rendu : `npm run dev`

### 🔧 Dépannage

**Problème** : Police non chargée
- Vérifiez que les fichiers existent dans `public/fonts/`
- Vérifiez les chemins dans `app/layout.tsx`

**Problème** : Build échoue
- Vérifiez que les fichiers sont bien des fichiers WOFF2 valides
- Vérifiez la syntaxe de configuration dans `layout.tsx` 
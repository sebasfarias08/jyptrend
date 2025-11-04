#!/bin/bash

echo "🚀 Iniciando build completo para JYP Trend..."

# --- Build Web (para GitHub Pages) ---
echo "🌐 Compilando versión Web..."
npm run build:web

echo "📦 Subiendo cambios a GitHub..."
git add .
git commit -m "🚀 Build Web + Android actualizado"
git push origin main

# --- Build Android (.apk) ---
echo "🤖 Compilando versión Android..."
npm run build:android
npm run cap:copy
npm run cap:sync
npm run apk:debug

echo "✅ Compilación completa. APK generado en:"
echo "   android/app/build/outputs/apk/debug/app-debug.apk"
# K-Silence Applikation
Dies ist das Repository für die Anwendung K-Silence. Das Backend "K-Silence AppServer" ist in einem separaten Repository untergebracht.

## IDE - Setup
Für die Anwendung wird Apache Cordova und OpenUI5 verwendet. Für Apache Cordova werden folgende Installationen benötigt:

* NodeJS (https://nodejs.org/en/)
* Apache Cordova (https://cordova.apache.org/#getstarted)
* Android SDK (http://developer.android.com/sdk/installing/index.html?pkg=tools)

## Ablauf
In diesem Teil wird der grobe Ablauf erklärt.
### Anmeldem am System
* Beim Start der Anwendung meldet sich das Smartphone direkt beim GCM Server und bekommt eine eindeutige ID (einmalig für jedes Smartphone und jede App)
* Diese ID wird beim Login zusammen mit dem eingegebenen Namen an das Backend gesendet und gespeichert
### Neue Nachricht senden
* Eine neue Nachricht enthält immer die ID des Empfängers, einen Titel (den Namen des Senders) und einen Text (den Nachrichteninhalt)
* Diese Nachricht wird an das Backend gesendet, gespeichert und anschließend an den GCM Server weitergegeben.
* Dieser leitet die Nachricht an den Empfänger weiter
### Vom System abmelden
* Beim Abmelden wird der jeweilige Kontakt im Backend aktualisiert (boolean isAvailable auf false)
* Anschließend wird der Kontakt nicht mehr in der Liste der Kontakte angezeigt

## Installation der Anwendung auf ...

### ... Android
Es muss das Android SDK installiert sein. In den Run-Configurations der IDE muss der Pfad zu Cordova angegeben werden. 
Zusätzlich als Command "run" und Platform "android". Wenn das Smartphone per USB am Notebook angeschlossen und wird beim Start
automatisch das Smartphone ausgewählt und die Anwendung installiert.
Falls automatisch der Emulator gestartet wird: *cordova build android* und die anschließend erstellte APK auf das Smartphone kopieren + installieren.

### ... iOS
Im Projektverzeichnis *cordova build ios* ausführen, Xcode öffnen und die Xcode-Datei im *Projektverzeichnis/platforms/ios* öffnen. 
Zu beachten in General ist, dass das Main Interface leer sein muss! Zusätzlich ist als Team Kaufland Informationssysteme angegeben werden (eigene Apple ID erforderlich + 
Zuweisung der Apple ID in das "Kaufland Apple Entwicklungsteam" / Ansprechpartner: Michael Link)

## Link zum Backend
Es müssen zwei Variablen beachtet werden, die den Link zum Backend angeben: *www/js/index.js* und *www/Components.js*

## Verwendung einer Smartwatch in Verbindung mit einem Smartphone
Auf dem Smartphone die App *Android Wear* aus dem Play Store herunterladen und die Smartwatch mit dem Smartphone verbinden. Anschließend bekommt die Smartwatch sämtliche 
Benachrichtigungen des Smartphones.

## Präsentation
Liegt derzeit im Projektverzeichnis und kann verwendet / verändert / verbessert werden.
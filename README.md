# Code Story
CPSC 507 Course Project

## Chrome Extension
Go to chrome://extensions/
Check the "Developer mode" checkbox
Click on "Load unpacked extension"
Select the "extchrome" folder in the codestory directory

## Atom Package
To install the package copy it the github directory in your home directory:
```
cp -r ./extatom/codestory ~/.atom/packages/
```

After restarting/reloading Atom, you should see the menu entry `Packages > Code Story`.

## Backend
To deploy the backend service, from the `service` directory, run:
```
yarn deploy
```

Then, to start it:
```
yarn start
```

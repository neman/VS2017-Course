## Web development

Brand new JavaScript language service
(quick help, refactoring, intellisense)
*before*: chakra engine (runing entire engine in background, compute js code on the fly)
*now*: static analysis engine provided by type script language service, performance, faster load, richer intellisense

Intellisense: show example with query selector, signature --> type in blue
How it works, got to F12 on query selector --> .d.ts file (type script declaration file)

Bundler & Minifier https://marketplace.visualstudio.com/items?itemName=MadsKristensen.BundlerMinifier
Enable bundle on build

Show bundle & minifier

jquery, start typing with dollar sign and show jquery intellisense options

Filter intellisense window (properties ALT+P, methods ALT+M)
$.ajax --> go to definition F12 (community is working on these dts files, declaration files, over 2000 libraries are covered)

Declaration files are not in project, they are downloaded based on js library used, VS cached them for strictly IntelliSense

#### jquery example
use $ instead of querySelector
```js
let elm = document.querySelector("#greeting");
let elm = $("#greeting");

elm.textContent +=  `${greeting} World!!`;
elm.text(`${greeting} World!!`);
```

Missing semicolon
`hello("Hello")`

Show error list (ES Lint static code analysis that makes sure we write quality code)
It's now built in the box in VS2017 (we do not need node js toolbox)
CLick on error

Tools --> Web Code Analysis --> Edit ESLint settings

Show CTR+S change of
hello("Hello") to hello("Ciao!") 
Web Essentials 2017 must be installed for ctr+s

Browser link --> Web Accessibility Checker

#### Html lang
Remove underscore to show example
```html
<html _lang="en">
```

#### ECMAScript Transtipulation

Convert ES6 to ES5
Use type script compiler which is supported natively out of the box

Right click on `site.js` Transpile to JavaScript

`tsconfig.json` file created. Rename `bundle.js` to `site-es5.js` and rebuild.

Go to _Layout.cshtml change script reference (with help of intelli sense) to 
`<script src="~/js/site-es5.min.js" asp-append-version="true"></script>`

#### Source map debugging
Demo how change in site.js goes all the way to site-es5.min.js and browser change

Run with Chrome Browser to show debugging

**Ask question**: What is source for debug: site.js or site-es5.js?
Change value of greeting to somke other string.
How it's done? With source map file.
Source map file - This is a file that holds information about your original files. When you query a certan line and column number in your generated minified JavaScript you can do a lookup in the source map which returns the original location.

#### Jsdoc instead vsdocs

Enter /** for docs code generation
add aditional description, change any type to string, show IntelliSense for `hello("Hello")`
**Ask question** What if we pass int instead of string to function?

Industry standard
http://usejsdoc.org/about-getting-started.html

#### Rename
CTRL + R, CTRL + R

#### Peek to definition
ALT + F12

#### Find all references
SHIFT + F12

The repository for high quality TypeScript type definitions.
https://github.com/DefinitelyTyped/DefinitelyTyped

Trivia :)
https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types
Note on github too many files: Sorry, we had to truncate this directory to 1,000 files. 2,159 entries were omitted from the list.

VS2017 is using npm to bring them in, but you do not see that (behind the scenes, seperate from project)


## Nuget 4.0

http://blog.nuget.org/20170316/NuGet-now-fully-integrated-into-MSBuild.html

Visual Studio 2017 comes with NuGet 4.0.

New project (netstandard)

AwesomeClassLib --> add package reference 

Manage all project dependencies in one place

Add `Microsoft.AspNetCore.Mvc` to 451 as package.config to show dependency example with many files that MVC brings as dependency

1. add ClassLibrary classic, delete all references
2. quick search --> nuget package manager --> general
3. show Package Management options

Show examples with classic .Net framework
1. Package Reference
2. Packages Config (packages folder in root)

Conditionally reference a NuGet package. This allows you to choose package references per target framework, configuration, platform, or other pivots

First try with MVC targeting all (net45, net451, net461)

```xml
<ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Mvc" Version="1.1.3"/>
</ItemGroup>

<ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Mvc" Version="1.1.3" Condition = "'$(TargetFramework)' == 'net451'"/>
</ItemGroup>

<ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Mvc" Version="1.1.3" Condition="'$(TargetFramework)' == 'net451' OR '$(TargetFramework)' == 'net461' " />
</ItemGroup>
```

Version Ranges
```xml
  <ItemGroup>
    <PackageReference Include="Serilog" Version="[2.1.0, 2.4.0)" />
    <!--<PackageReference Include="Microsoft.AspNetCore.Mvc" Version="[1.1.0, 2.0.0)" />-->
    <!--<PackageReference Include="Microsoft.AspNetCore.Mvc" Version="1.1.*" />-->
  </ItemGroup>
```

## Visual Studio locator
https://github.com/Microsoft/vswhere
https://chocolatey.org/packages/vswhere

#### First class MSBuild citizen

`msbuild /t:pack` -->  (.\msbuild.bat /t:pack)
`msbuild /t:restore` -->  (.\msbuild.bat /t:restore)

#### New commands in the .NET CLI

`dotnet nuget locals` --> `dotnet nuget locals all --list`

`dotnet nuget push` --> `dotnet nuget push -h`
`dotnet nuget delete` --> `dotnet nuget delete -h`

dotnet restore and dotnet pack now have the same behavior as MSBuild restore and MSBuild pack providing a consistent and reliable experience.
```
dotnet restore == msbuild /t:restore
dotnet pack == msbuild /t:pack  
```

### Breaking Changes

**Default Location for the machine-wide NuGet.config**

In Visual Studio 2017 and above, the machine-wide NuGet.config is located at %ProgramFiles(x86)%\NuGet\Config\. Going forward, nuget.exe v4.0.0+ will also treat this as the new location for the machine-wide configuration. The primary driver for the change is to improve security in a multi-user scenario. Previously we would write to the %ProgramData% folders which don’t require Admin privileges to modify. %ProgramFiles(x86)% folders are protected and only users with Administrative privileges, or those granted permissions by an administrator can change their contents.

Impact - NuGet.config in %ProgramData%\NuGet\Config\ will no longer be implicitly referenced or considered for hierarchical merging of NuGet.config. This is only applicable if you were previously using machine-wide NuGet configuration files. Solution - You must manually migrate existing config files from %ProgramData% to %ProgramFiles(x86)%

## dotnet new templating mechanism

pokazati rad sa novim template-ima

`dotnet new --debug:reinit.` - reinicijalizuje template

`dotnet new --install "NetEscapades.Templates::*"`

`dotnet new basicwebapi --help`

`dotnet new basicwebapi --name "MyTemplate"`
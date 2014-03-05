#pragma strict

private var ChatScripUrl= "http://127.0.0.1/chatscriptclient.php?";
private var NewIDUrl= "http://127.0.0.1/chatscriptid.php?";
private var userID = "attendee";

private var userInput : String = "";

private var userText : String = null;
private var botOutput : String = null;

private var consoleText : String;
private var scrollPosition : Vector2 = Vector2.zero;
private var showLog : boolean = false;
private var logRect : Rect = Rect (20, 20, 350, Screen.height / 2);

public var textDelay = 0.2;
private var words : String = "Testing, testing, one two, one two";
private var currentWords : String;

private var timeStamp : System.DateTime;
private var currentTime : String = null;

public var customSkin : GUISkin;
public var customStyle : GUIStyle;

var anim : Animator = null;
private var isTyping : boolean = false;
private var isAngry : boolean = false;
private var angryIdentifier : String = "Angerangeranger";

function Awake()
{
	anim = GetComponent(Animator);
}

function Start ()
{
	yield getNewID();
	postMessage("");
    
    customStyle.fontSize = Screen.width / 40;
}

private function AddText(newText : String)
{
    words = newText;
    
    if(words.Contains(angryIdentifier))
    {
    	words = words.Replace(angryIdentifier, "");
    	isAngry = true;
    }
    else
    	isAngry = false;
    	
    TypeText(words);
}
 
function TypeText (compareWords : String) 
{
	currentWords = null;

    for (var letter in compareWords.ToCharArray())
    {
    	isTyping = true;
    	
        if(letter==13) break;
        if (words != compareWords) break;
        currentWords += letter;
        // yield WaitForSeconds(textDelay);
        yield WaitForSeconds(textDelay * Random.Range(0.01, 0.5)); // Original Random.Range(0.5, 2)
    }
    
    isTyping = false;
}

function OnGUI()
{
	GUI.skin = customSkin;
	
	GUI.skin.box.wordWrap = true; // Set the wordwrap on for boxes.
	GUI.skin.box.alignment = TextAnchor.MiddleCenter; // Text alignment for boxes
	GUI.skin.label.alignment = TextAnchor.MiddleLeft; // Text alignment
	
	GUILayout.BeginArea(Rect (Screen.width * 0.1, Screen.height * 0.1, Screen.width * 0.8, Screen.height * 0.8));	
	
	GUILayout.BeginVertical();
		
		// 	User text bubble
	    // GUI.Box(Rect(0,Screen.height - 225,250,75), userText);
	    
	    // Bot text bubble
	    // GUI.Box(Rect(0,Screen.height - 250,350,100), currentWords);
	    
	    if(showLog) // Manages log window elements
		{
			logRect = GUI.Window(0, logRect, LogWindowFunction, "Log");						
		}
		
		// Not really the most ideal way to do this
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		GUILayout.FlexibleSpace();
		
		GUILayout.BeginHorizontal();
			GUILayout.BeginVertical();
				GUILayout.FlexibleSpace();
			GUILayout.EndVertical();
			
			// Bot text bubble
		    GUILayout.Box(currentWords, customStyle);
		    
		    GUILayout.BeginVertical();
				GUILayout.FlexibleSpace();
			GUILayout.EndVertical();
		GUILayout.EndHorizontal();
		
		GUI.skin = customSkin;
		
		// Text box for user input
		GUILayout.Label("Have a question?");
		userInput = GUILayout.TextField(userInput);
				
		// Horizontal field for "Log", "Reset" and "Rebuild" buttons
		GUILayout.BeginHorizontal();
		
			if(GUILayout.Button("Log"))
			{
				showLog = !showLog; // Toggles log visibility
			}
			if(GUILayout.Button("Start Over"))
			{
				getNewID();
				postMessage("");
				userText = null;
			}
			if (GUILayout.Button("Submit"))
			{
				// Recording timestamps for user inputs
				timeStamp = System.DateTime.Now;
				currentTime = String.Format("{0:D2}:{1:D2}:{2:D2}", timeStamp.Hour, timeStamp.Minute, timeStamp.Second);
				
				consoleText = consoleText+"\n["+currentTime+"] You said: "+userInput;
				
				
				// consoleText = consoleText+"\n[You] said: "+userInput;
		        postMessage(userInput);
		        // userText = userInput;
		        userInput = "";
			}
			
		GUILayout.EndHorizontal();
		
	GUILayout.EndVertical();
	
	GUILayout.EndArea();
}

function LogWindowFunction (windowID : int) 
{
	// Draw any Controls inside the window here
	scrollPosition = GUILayout.BeginScrollView(scrollPosition, GUILayout.Width(325));			
	GUILayout.Box(consoleText, GUILayout.Width(300)); // Post console text to the log.		
	GUILayout.EndScrollView ();
	
	if(GUILayout.Button("Close"))
	{
		showLog = !showLog; // Toggles log visibility
	}
	
	GUI.DragWindow ();
}

function Update ()
{
	if(anim == null)
		Debug.LogError("Animator is null!");

	if(isTyping && isAngry)
	{
		anim.SetBool("IsAngryTalking", true);
	}
	else if(isTyping && !isAngry)
	{
		anim.SetBool("IsHappyTalking", true);
	}
	else
	{
		anim.SetBool("IsAngryTalking", false);
		anim.SetBool("IsHappyTalking", false);
	}
}

function getNewID()
{
    var w = WWW(NewIDUrl);
    yield w;	
    userID = w.text;
    print(userID);
}

function postMessage(message:String)
{

    var msgURL = ChatScripUrl+"message="+WWW.EscapeURL(message)+"&userID="+WWW.EscapeURL(userID);
    print(msgURL);
    var w = WWW(msgURL);
    yield w;
    // consoleText = consoleText+"\n[Jarvis] said: "+w.text;
    
    botOutput = w.text; // Retrieve bot response for display in text bubble
	AddText(botOutput);
    
    // Recording time stamps for bot replies
    timeStamp = System.DateTime.Now;
	currentTime = String.Format("{0:D2}:{1:D2}:{2:D2}", timeStamp.Hour, timeStamp.Minute, timeStamp.Second);
		
	consoleText = consoleText+"\n["+currentTime+"] Jarvis said: "+w.text;
	scrollPosition.y = Mathf.Infinity;
}
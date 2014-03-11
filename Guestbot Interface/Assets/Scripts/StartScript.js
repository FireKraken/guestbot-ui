#pragma strict

public var customSkin : GUISkin;
public var customStyle : GUIStyle;

function Start () 
{
	customStyle.fontSize = Screen.width / 40;
}

function OnGUI ()
{
	GUILayout.BeginArea (Rect (Screen.width * 0.1, Screen.height * 0.1, Screen.width * 0.8, Screen.height * 0.8));
	GUI.skin = customSkin;
	
	GUILayout.Space (Screen.height * 2 / 3);
	
	GUILayout.BeginHorizontal ();
		GUILayout.BeginVertical ();
			GUILayout.FlexibleSpace ();
		GUILayout.EndVertical ();
		
		// Bot text bubble
	    GUILayout.Box ("Jarvis is currently on standby.", customStyle);
	    
	    GUILayout.BeginVertical ();
			GUILayout.FlexibleSpace ();
		GUILayout.EndVertical ();
	GUILayout.EndHorizontal ();
	
	GUILayout.BeginHorizontal ();
		
		if (GUILayout.Button("Talk to Jarvis?"))
		{
			Application.LoadLevel("MainScene");
		}
		
	GUILayout.EndHorizontal ();
	GUILayout.EndArea();
}

function Update () 
{

}
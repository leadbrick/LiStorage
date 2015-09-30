/*Copyright -Leadbrick Studio
Author -Prithviraj Jadhav

Javascript library to abstract HTML5 LocalStorage API(5mb Max)
GNU GPL
The HTML5 Storage API calls ar non-async and therfore slower than browser-specific APIs
Create a master list that holds all other list names when initializing the app
Then create other lists that hold key-value pairs string-type.New lists are
automatically indexed in master list. All ListNames in master end with / (delimiter).
*/

var master="";
function createMaster()
{
	master=localStorage.getItem("masterListed");
	if(master == -1)
	{
		localStorage.setItem("masterListed","/");
		master=localStorage.getItem("masterListed");
	}
}

function createList(listName)
{
	list=localStorage.getItem(listName);
	if(list == -1)
	{
	//creating list in storage and updating masterlist.List holds Null.
	localStorage.setItem(listName,"/");
	master = master + listName+"/";		
	localStorage.setItem("masterListed",master);
	}
}

function deleteList (listName)
{
	/*
	//JS strings are indexed from 0
	//pos stores position of first char of substring
	var pos = master.search(listName);*/
	temp="/"+listName+"/";
	master.replace(temp,"/");
	localStorage.setItem("masterListed",master);
}

function addToList(listName,listData)
{
	
	tempData=localStorage.getItem(listName);
	localStorage.setItem(listName,tempData+listData+"/");
}

function delFromList (listName,listData) 
{
	temp="/"+listData+"/";
	list=localStorage.getItem(listName);
	list.replace(temp,"/");
	localStorage.setItem(listname,list);	
}

function getList (listName)
{
	//returns an array containing all list items
	var listItems=[];
	var j=0;
	listItems[j]="";
	listData=localStorage.getItem(listName);
	for (var i = 1; i < listData.length; i++)
	{
		if(listData[i]=="/")
		{
			j++;
			listItems[j]="";
		}
		else
		{
			listItems[j]=listItems[j]+listData[i];
		}
	}
	return listItems;	
}
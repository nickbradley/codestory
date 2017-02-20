//  View code story: http://nicholascbradley.com:4321/codestory/9d5f03b35
String jsonArray = storageManager.getSerializedEntities();
Type entityType = new TypeToken<ArrayList<Entity>>(){}.getType();
List<Entity> entities = new Gson().fromJson(jsonArray, entityType);

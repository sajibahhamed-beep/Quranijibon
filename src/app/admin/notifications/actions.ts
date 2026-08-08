"use server";

import {
  getNotifications as _getNotifications,
  markAsRead as _markAsRead,
  markAllAsRead as _markAllAsRead,
  deleteNotification as _deleteNotification,
  clearAllNotifications as _clearAllNotifications,
  addNotification as _addNotification,
  AdminNotification,
} from "@/data/notificationsStorage";

export async function getNotifications() {
  return await _getNotifications();
}

export async function markAsRead(id: string) {
  return await _markAsRead(id);
}

export async function markAllAsRead() {
  return await _markAllAsRead();
}

export async function deleteNotification(id: string) {
  return await _deleteNotification(id);
}

export async function clearAllNotifications() {
  return await _clearAllNotifications();
}

export async function addNotification(
  data: Omit<AdminNotification, "id" | "timestamp" | "read">
) {
  return await _addNotification(data);
}

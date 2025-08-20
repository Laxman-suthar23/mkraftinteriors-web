import { useState, useEffect } from "react";
import { ContactSubmission } from "@/types";

export function useContacts() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Move fetchContacts outside useEffect so it can be reused
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/contact");
      
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const updateContactStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact status");
      }

      // Fix: Use proper type assertion for status
      setContacts(contacts.map(c => 
        c.id === id ? { ...c, status: status as any } : c
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      setContacts(contacts.filter(c => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  const refetch = () => {
    setError(null);
    fetchContacts(); // Now this works since fetchContacts is in scope
  };

  return { 
    contacts, 
    loading, 
    error, 
    updateContactStatus, 
    deleteContact, 
    refetch 
  };
}
